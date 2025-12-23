"use client";

import { useState, useEffect } from "react";
import { X, Phone, Lock, User, Briefcase } from "lucide-react";
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
  const [selectedRole, setSelectedRole] = useState<"client" | "service_provider">("client");
  const [step, setStep] = useState<"phone" | "otp" | "role_selection">("phone");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [expiresAt, setExpiresAt] = useState<string | null>(null);
  const [countdown, setCountdown] = useState(0);
  const [tempTokens, setTempTokens] = useState<any>(null);
  const [tempUserData, setTempUserData] = useState<any>(null);

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
      
      // Verify OTP
      const res = await AuthService.verifyOTP(phoneNumber, otp);
      
      // Check if user has a role (exists in system)
      const userRole = res.data?.user?.role;
      
      if (!userRole) {
        // New user - show role selection
        setTempTokens(res.tokens);
        setTempUserData(res.data);
        setStep("role_selection");
      } else {
        // Existing user - login directly
        login(res.data, res.tokens);
        onClose();
        redirectBasedOnRole(res.data);
      }
    } catch (err: any) {
      setError(err.message || "Invalid OTP");
    } finally {
      setLoading(false);
    }
  };

  const handleRoleSelect = async () => {
    try {
      setLoading(true);
      setError("");
      
      if (!tempUserData?.user?.id) {
        throw new Error("User ID not found");
      }
      
      // Update user role
      const updatedUser = await AuthService.updateUserRole(
        tempUserData.user.id,
        selectedRole,
        tempTokens
      );
      
      // Update user data with new role
      const updatedUserData = {
        ...tempUserData,
        user: {
          ...tempUserData.user,
          role: selectedRole
        }
      };
      
      // Login with updated data
      login(updatedUserData, tempTokens);
      resetAndClose();
      
      // Redirect based on selected role
      redirectBasedOnRole(updatedUserData);
    } catch (err: any) {
      setError(err.message || "Failed to update role");
    } finally {
      setLoading(false);
    }
  };

  const redirectBasedOnRole = (userData: any) => {
    const role = userData?.user?.role;
    
    if (role === "service_provider") {
      router.push("/dashboard/profile");
    } else {
      router.push("/dashboard");
    }
  };

  const resetToInitial = () => {
    setPhoneNumber("");
    setOtp("");
    setSelectedRole("client");
    setStep("phone");
    setError("");
    setExpiresAt(null);
    setCountdown(0);
    setTempTokens(null);
    setTempUserData(null);
  };

  const resetAndClose = () => {
    resetToInitial();
    onClose();
  };

  useEffect(() => {
  if (isOpen) {
    resetToInitial();
  }
}, [isOpen]);

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
            {step === "phone" && "Welcome! 👋"}
            {step === "otp" && "Verify OTP 🔐"}
            {step === "role_selection" && "Choose Your Role 🎯"}
          </h2>
          <p className="mt-2 text-sm text-white/90">
            {step === "phone" && "Enter your 10-digit mobile number to continue"}
            {step === "otp" && `OTP sent to ${phoneNumber}`}
            {step === "role_selection" && "Select your role to continue"}
          </p>

          {/* Step Progress */}
          <div className="mt-6 flex gap-2">
            {["phone", "otp", ...(step === "role_selection" ? ["role_selection"] : [])].map((s, index) => (
              <span
                key={s}
                className={`h-1 flex-1 rounded-full ${
                  step === s ? "bg-white" : "bg-white/40"
                }`}
              />
            ))}
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
              <div className="text-center space-y-4">
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
                {loading ? "Verifying..." : "Verify & Continue"}
              </button>

              <div className="flex justify-between">
                <button
                  onClick={() => setStep("phone")}
                  className="text-sm text-gray-500 hover:text-primary-600"
                >
                  Change phone number
                </button>
                <button
                  onClick={resetToInitial}
                  className="text-sm text-gray-500 hover:text-primary-600"
                >
                  Use different number
                </button>
              </div>
            </>
          )}

          {/* Role Selection Step (only for new users) */}
          {step === "role_selection" && (
            <>
              <div className="text-center mb-6">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-100 text-primary-600 text-sm mb-2">
                  <span>Welcome New User! 🎉</span>
                </div>
                <p className="text-gray-600">
                  Select how you want to use our platform
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={() => setSelectedRole("client")}
                  className={`p-6 rounded-xl border-2 transition-all ${
                    selectedRole === "client"
                      ? "border-primary-500 bg-primary-50 scale-105 shadow-md"
                      : "border-gray-200 hover:border-primary-300"
                  }`}
                >
                  <div className="flex flex-col items-center gap-3">
                    <div className={`p-3 rounded-full ${
                      selectedRole === "client" ? "bg-primary-100 text-primary-600" : "bg-gray-100 text-gray-600"
                    }`}>
                      <User size={24} />
                    </div>
                    <p className="font-bold">I am a User</p>
                    <p className="text-sm text-gray-600 text-center">
                      I want to explore and hire service providers
                    </p>
                  </div>
                </button>

                <button
                  onClick={() => setSelectedRole("service_provider")}
                  className={`p-6 rounded-xl border-2 transition-all ${
                    selectedRole === "service_provider"
                      ? "border-warm-500 bg-warm-50 scale-105 shadow-md"
                      : "border-gray-200 hover:border-warm-300"
                  }`}
                >
                  <div className="flex flex-col items-center gap-3">
                    <div className={`p-3 rounded-full ${
                      selectedRole === "service_provider" ? "bg-warm-100 text-warm-600" : "bg-gray-100 text-gray-600"
                    }`}>
                      <Briefcase size={24} />
                    </div>
                    <p className="font-bold">I am a Service Provider</p>
                    <p className="text-sm text-gray-600 text-center">
                      I want to offer my services to clients
                    </p>
                  </div>
                </button>
              </div>

              {error && (
                <div className="bg-red-50 text-red-600 px-4 py-3 rounded-xl text-sm">
                  {error}
                </div>
              )}

              <div className="space-y-4 pt-4">
                <button
                  onClick={handleRoleSelect}
                  disabled={loading}
                  className="w-full py-4 rounded-xl font-semibold text-white
                  bg-gradient-to-r from-primary-500 to-warm-500
                  hover:-translate-y-0.5 hover:shadow-[0_10px_30px_rgba(245,158,11,0.4)]
                  transition disabled:opacity-50"
                >
                  {loading ? "Completing Registration..." : "Continue"}
                </button>

                <div className="text-center text-sm text-gray-500">
                  <p>You can change your role later in account settings</p>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}