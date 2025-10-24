import { Calendar, CheckCircle, MapPin, Users, UtensilsCrossed } from "lucide-react";
import style from "./ThirdSection.module.css";

const ThirdSection = () => {
  return (
    <>
      <section className={` bg-gradient-to-br from-cream-50 to-primary-50`}>
        <div className={`${style.firstDiv}`}>
          <h2 className={`${style.headingText}`}>Book Chef</h2>
          <img
            src="https://res.cloudinary.com/dzvvb0z0h/image/upload/f_auto,q_auto/v1757953148/deco23_oucobt.png"
            alt="Decoration Icon"
          />
          <h2 className={`${style.headingText2}`}>Easy mobile booking</h2>
        </div>

        <div className={style.secondDiv}>
          {/* LEFT SIDE */}
          <div className={style.secondLeft}>
            <div className={style.secondFir}>
              <div className='flex items-center gap-4'>
                <div className="bg-gradient-to-r from-primary-400 to-primary-500 text-white w-20 h-20 rounded-full flex items-center justify-center  mb-4 shadow-lg">
                  <Calendar className="w-10 h-10 text-white " /> 
                </div>
                <p>service type & define event occasion</p>
              </div>
              <img
                src="https://res.cloudinary.com/dzvvb0z0h/image/upload/f_auto,q_auto/v1757953177/Vector3_g4cejv.png"
                className={style.arrImg}
                alt=""
              />
            </div>

            <div className={style.secondSec}>
              <div className='flex items-center gap-4'>
                <div className="bg-gradient-to-r from-warm-400 to-warm-500 text-white w-20 h-20 rounded-full flex items-center justify-center  mb-4 shadow-lg">
                  <MapPin className="w-10 h-10 text-white " /> 
                </div>
                <p>Enter event
                location & choose suitable schedule</p>
              </div>
              {/* <p className={style.col2}>
                <span className={`${style.spanBg}`}>Step 2 :</span> Enter event
                location & choose suitable schedule
              </p> */}
              <img
                src="https://res.cloudinary.com/dzvvb0z0h/image/upload/f_auto,q_auto/v1757953177/Vector4_zgbtfg.png"
                className={style.arrImg1}
                alt=""
              />
            </div>

            <div className={style.secondFir}>
              <div className='flex items-center gap-4'>
                <div className="bg-gradient-to-r from-accent-400 to-accent-500 text-white w-20 h-20 rounded-full flex items-center justify-center  mb-4 shadow-lg">
                  <Users className="w-10 h-10 text-white " /> 
                </div>
                <p>Specify
                guest details & set overall budget</p>
              </div>
              {/* <p className={style.col2}>
                <span className={`${style.spanBg}`}>Step 3 :</span> Specify
                guest details & set overall budget
              </p> */}
              <img
                src="https://res.cloudinary.com/dzvvb0z0h/image/upload/f_auto,q_auto/v1757953177/Vector3_g4cejv.png"
                className={style.arrImg}
                alt=""
              />
            </div>

            <div className={style.secondSec}>
              <div className='flex items-center gap-4'>
                <div className="bg-gradient-to-r from-fresh-400 to-fresh-500 text-white w-20 h-20 rounded-full flex items-center justify-center  mb-4 shadow-lg">
                  <UtensilsCrossed className="w-10 h-10 text-white " /> 
                </div>
                <p>Choose food
                preferences & dietary restrictions</p>
              </div>
              {/* <p className={style.col2}>
                <span className={`${style.spanBg}`}>Step 4 :</span> Choose food
                preferences & dietary restrictions
              </p> */}
              <img
                src="https://res.cloudinary.com/dzvvb0z0h/image/upload/f_auto,q_auto/v1757953177/Vector4_zgbtfg.png"
                className={style.arrImg1}
                alt=""
              />
            </div>

            <div className={style.secondFir}>
              <div className='flex items-center gap-4'>
                <div className="bg-gradient-to-r from-primary-500 to-warm-500 text-white w-20 h-20 rounded-full flex items-center justify-center  mb-4 shadow-lg">
                  <CheckCircle className="w-10 h-10 text-white " /> 
                </div>
                <p>Confirm
                contact details & receive chef proposals</p>
              </div>
              {/* <p className={style.col2}>
                <span className={`${style.spanBg}`}>Step 5 :</span> Confirm
                contact details & receive chef proposals
              </p> */}
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className={style.secRigh}>
            <div className={style.secRighInn}>
              <a
                href="https://play.google.com/store"
                target="_blank"
                rel="noopener noreferrer"
                className={style.appButton}
              >
                Google Play
              </a>
              <a
                href="https://apple.com/app-store"
                target="_blank"
                rel="noopener noreferrer"
                className={style.appButton}
              >
                App Store
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ThirdSection;