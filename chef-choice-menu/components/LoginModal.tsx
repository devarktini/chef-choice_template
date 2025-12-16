"use client";

import { useState, useEffect } from "react";
import { X, Phone, Lock } from "lucide-react";
import { AuthService } from "@/services/authService";
import { useAuthStore } from "@/stores/authStore";
import { useRouter } from "next/navigation";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function LoginModal({ isOpen, onClose }: LoginModalProps) {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [role, setRole] = useState<"client" | "service_provider">("client");
  const [step, setStep] = useState<"phone" | "otp">("phone");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [expiresAt, setExpiresAt] = useState<string | null>(null);
  const [countdown, setCountdown] = useState(0);

  const login = useAuthStore((s) => s.login);
  const router = useRouter();

  /* ---------------- Countdown ---------------- */
  useEffect(() => {
    if (!expiresAt) return;
    const timer = setInterval(() => {
      const diff =
        Math.floor(
          (new Date(expiresAt).getTime() - Date.now()) / 1000
        ) || 0;
      setCountdown(Math.max(diff, 0));
      if (diff <= 0) clearInterval(timer);
    }, 1000);
    return () => clearInterval(timer);
  }, [expiresAt]);

  /* ---------------- Handlers ---------------- */
  const handleSendOTP = async () => {
    if (phoneNumber.length !== 10) {
      setError("Enter a valid 10-digit mobile number");
      return;
    }
    try {
      setLoading(true);
      setError("");
      const res = await AuthService.sendOTP(phoneNumber);
      setExpiresAt(res.expires_at);
      setStep("otp");
    } catch (err: any) {
      setError(err.message || "Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOTP = async () => {
    if (otp.length !== 6) {
      setError("Enter valid 6-digit OTP");
      return;
    }
    try {
      setLoading(true);
      setError("");
      const res = await AuthService.verifyOTP(phoneNumber, otp, role);
      login(res.data, res.tokens);
      onClose();
      router.push("/dashboard");
    } catch (err: any) {
      setError(err.message || "Invalid OTP");
    } finally {
      setLoading(false);
    }
  };

  const resetAndClose = () => {
    setPhoneNumber("");
    setOtp("");
    setRole("client");
    setStep("phone");
    setError("");
    setExpiresAt(null);
    setCountdown(0);
    onClose();
  };

  if (!isOpen) return null;

  /* ---------------- UI ---------------- */
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-lg"
        onClick={resetAndClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-md rounded-3xl bg-white shadow-2xl overflow-hidden animate-[scaleIn_0.3s_ease]">

        {/* Header */}
        <div className="relative px-6 py-8 bg-gradient-to-br from-primary-600 via-warm-500 to-orange-400 text-white">
          <div className="absolute -top-24 -right-24 w-60 h-60 bg-white/20 rounded-full blur-3xl" />

          <button
            onClick={resetAndClose}
            className="absolute top-4 right-4 opacity-80 hover:opacity-100"
          >
            <X />
          </button>

          <h2 className="text-3xl font-extrabold tracking-tight">
            {step === "phone" ? "Welcome Back 👋" : "Almost There 🔐"}
          </h2>
          <p className="mt-2 text-sm text-white/90">
            {step === "phone"
              ? "Login instantly using your mobile number"
              : "Secure your account with OTP verification"}
          </p>

          {/* Step Progress */}
          <div className="mt-6 flex gap-2">
            <span
              className={`h-1 flex-1 rounded-full ${
                step === "phone" ? "bg-white" : "bg-white/40"
              }`}
            />
            <span
              className={`h-1 flex-1 rounded-full ${
                step === "otp" ? "bg-white" : "bg-white/40"
              }`}
            />
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Phone Step */}
          {step === "phone" && (
            <>
              <div className="relative">
                <input
                  value={phoneNumber}
                  onChange={(e) =>
                    setPhoneNumber(e.target.value.replace(/\D/g, "").slice(0, 10))
                  }
                  placeholder=" "
                  className="peer w-full px-4 pt-5 pb-2 rounded-xl border focus:ring-2 focus:ring-primary-500 outline-none"
                />
                <label className="absolute left-4 top-2 text-xs text-gray-500
                  peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm
                  peer-focus:top-2 peer-focus:text-xs transition-all">
                  Mobile Number
                </label>
                <Phone className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" />
              </div>

              {error && (
                <div className="bg-red-50 text-red-600 px-4 py-3 rounded-xl text-sm">
                  {error}
                </div>
              )}

              <button
                onClick={handleSendOTP}
                disabled={loading || phoneNumber.length !== 10}
                className="w-full py-4 rounded-xl font-semibold text-white
                bg-gradient-to-r from-primary-500 to-warm-500
                hover:-translate-y-0.5 hover:shadow-[0_10px_30px_rgba(245,158,11,0.4)]
                transition disabled:opacity-50"
              >
                {loading ? "Sending OTP..." : "Continue →"}
              </button>
            </>
          )}

          {/* OTP Step */}
          {step === "otp" && (
            <>
              <div className="text-center space-y-1">
                <p className="text-gray-600 text-sm">
                  OTP sent to <b>{phoneNumber}</b>
                </p>
                {countdown > 0 && (
                  <span className="inline-block text-xs bg-primary-50 text-primary-600 px-3 py-1 rounded-full">
                    Expires in {Math.floor(countdown / 60)}:
                    {(countdown % 60).toString().padStart(2, "0")}
                  </span>
                )}
              </div>

              <input
                value={otp}
                onChange={(e) =>
                  setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))
                }
                placeholder="••••••"
                className="w-full text-center text-2xl tracking-[0.6em] font-bold py-4 rounded-xl border focus:ring-2 focus:ring-primary-500"
              />

              {/* Role */}
              <div className="grid grid-cols-2 gap-4">
                {["client", "service_provider"].map((r) => (
                  <button
                    key={r}
                    onClick={() => setRole(r as any)}
                    className={`p-4 rounded-xl border transition-all ${
                      role === r
                        ? "border-primary-500 bg-primary-50 scale-105 shadow-md"
                        : "border-gray-200 hover:border-primary-300"
                    }`}
                  >
                    <p className="font-semibold">
                      {r === "client" ? "Client" : "Service Provider"}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      {r === "client" ? "Hire services" : "Provide services"}
                    </p>
                  </button>
                ))}
              </div>

              {error && (
                <div className="bg-red-50 text-red-600 px-4 py-3 rounded-xl text-sm">
                  {error}
                </div>
              )}

              <button
                onClick={handleVerifyOTP}
                disabled={loading || otp.length !== 6}
                className="w-full py-4 rounded-xl font-semibold text-white
                bg-gradient-to-r from-primary-500 to-warm-500
                hover:-translate-y-0.5 hover:shadow-[0_10px_30px_rgba(245,158,11,0.4)]
                transition disabled:opacity-50"
              >
                {loading ? "Verifying..." : "Verify & Login"}
              </button>

              <button
                onClick={() => setStep("phone")}
                className="w-full text-sm text-gray-500 hover:text-primary-600"
              >
                Change phone number
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
