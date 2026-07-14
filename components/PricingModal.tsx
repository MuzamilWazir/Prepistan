import { 
  X, 
  Check, 
  Crown, 
  Sparkles, 
  CreditCard, 
  Lock, 
  AlertCircle, 
  Gift, 
  Tag, 
  CheckCircle2,
  Smartphone,
  Upload,
  FileText
} from "lucide-react";
import { PaymentConfig } from "../types";

interface PricingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUpgradeSuccess: () => void;
  language: "EN" | "UR";
  paymentConfig?: PaymentConfig;
}

export default function PricingModal({
  isOpen,
  onClose,
  onUpgradeSuccess,
  language,
  paymentConfig = {
    paymentLink: "https://buy.stripe.com/mock_prepistan_premium",
    easyPaisaNumber: "0345-6789101",
    easyPaisaName: "PREPISTAN PREP",
    jazzCashNumber: "0312-3456789",
    jazzCashName: "PREPISTAN JAZZ",
    enableCardPayment: true,
    enableEasyPaisa: true,
    enableJazzCash: true,
    monthlyPrice: 15,
    yearlyPrice: 99,
    lifetimePrice: 199,
    coupons: [
      { code: "PREPISTAN50", discount: 50 },
      { code: "PREP30", discount: 30 }
    ]
  }
}: PricingModalProps) {
  const [couponCode, setCouponCode] = useState("");
  const [discountApplied, setDiscountApplied] = useState(false);
  const [appliedDiscountPct, setAppliedDiscountPct] = useState(0);
  const [appliedCouponCode, setAppliedCouponCode] = useState("");
  const [couponError, setCouponError] = useState("");
  const [selectedPlan, setSelectedPlan] = useState<{ name: string; price: number; id: string } | null>(null);
  
  // Checkout card inputs
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvc, setCvc] = useState("");
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const [checkoutSuccess, setCheckoutSuccess] = useState(false);

  // Enabled flags
  const isCardEnabled = paymentConfig.enableCardPayment !== false;
  const isEasyPaisaEnabled = paymentConfig.enableEasyPaisa !== false;
  const isJazzCashEnabled = paymentConfig.enableJazzCash !== false;
  const isWalletEnabled = isEasyPaisaEnabled || isJazzCashEnabled;

  // Payment method state
  const [paymentMethod, setPaymentMethod] = useState<"card" | "easypaisa">(() => {
    if (isCardEnabled) return "card";
    if (isWalletEnabled) return "easypaisa";
    return "card";
  });

  // EasyPaisa manual payment inputs
  const [epMobile, setEpMobile] = useState("");
  const [epName, setEpName] = useState("");
  const [epTid, setEpTid] = useState("");
  const [epReceiptName, setEpReceiptName] = useState("");
  const [epDragActive, setEpDragActive] = useState(false);

  if (!isOpen) return null;

  const originalPlans = [
    { id: "free", name: "Free Aspirant", price: 0, period: "forever", desc: "Basic practice question pool for simple self testing." },
    { id: "monthly", name: "Monthly Premium", price: paymentConfig.monthlyPrice ?? 15, period: "month", desc: "Complete daily quiz streams and active AI tutor companionship." },
    { id: "yearly", name: "Yearly Professional", price: paymentConfig.yearlyPrice ?? 99, period: "year", desc: "Unrestricted competitive mock files, essay guidelines, and direct PDF downloads." },
    { id: "lifetime", name: "Lifetime Emperor", price: paymentConfig.lifetimePrice ?? 199, period: "one-time", desc: "Permanent elite credentials, future PMS/CSS mocks additions, and direct senior reviews." }
  ];

  // Apply Coupon Code matching active coupons list
  const handleApplyCoupon = () => {
    setCouponError("");
    const inputCode = couponCode.trim().toUpperCase();
    if (!inputCode) return;

    const activeCoupons = paymentConfig.coupons || [
      { code: "PREPISTAN50", discount: 50 },
      { code: "PREP30", discount: 30 }
    ];

    const found = activeCoupons.find((c: any) => c.code.toUpperCase() === inputCode);
    if (found) {
      setDiscountApplied(true);
      setAppliedDiscountPct(found.discount);
      setAppliedCouponCode(found.code);
      alert(`🎉 Coupon Applied! You received ${found.discount}% off on all Premium plans!`);
    } else {
      setCouponError("Invalid promo code. Generate one inside the Admin Panel.");
    }
  };

  const getPrice = (originalPrice: number) => {
    if (originalPrice === 0) return 0;
    return discountApplied ? Math.round(originalPrice * (1 - appliedDiscountPct / 100)) : originalPrice;
  };

  const handleLaunchCheckout = (plan: typeof originalPlans[0]) => {
    if (plan.price === 0) {
      alert("You are already on the Free Plan.");
      return;
    }
    setSelectedPlan({
      name: plan.name,
      price: getPrice(plan.price),
      id: plan.id
    });
  };

  const handleSubmitCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    if (!cardNumber || !expiry || !cvc) {
      alert("Please fill in all credit card details.");
      return;
    }

    setCheckoutLoading(true);
    setTimeout(() => {
      setCheckoutLoading(false);
      setCheckoutSuccess(true);
      setTimeout(() => {
        onUpgradeSuccess(); // Upgrade role state!
        setCheckoutSuccess(false);
        setSelectedPlan(null);
        onClose();
      }, 2000);
    }, 2500); // 2.5 seconds Stripe simulation!
  };

  const handleSubmitEasyPaisa = (e: React.FormEvent) => {
    e.preventDefault();
    if (!epMobile || !epName || !epTid) {
      alert(language === "EN" ? "Please fill in all EasyPaisa transaction details." : "براہ کرم ایزی پیسہ ٹرانزیکشن کی تمام تفصیلات درج کریں۔");
      return;
    }

    if (epTid.length < 8) {
      alert(language === "EN" ? "Please enter a valid EasyPaisa Transaction ID." : "براہ کرم درست ایزی پیسہ ٹرانزیکشن آئی ڈی درج کریں۔");
      return;
    }

    setCheckoutLoading(true);
    setTimeout(() => {
      setCheckoutLoading(false);
      setCheckoutSuccess(true);
      setTimeout(() => {
        onUpgradeSuccess(); // Upgrade state!
        setCheckoutSuccess(false);
        setSelectedPlan(null);
        setEpMobile("");
        setEpName("");
        setEpTid("");
        setEpReceiptName("");
        onClose();
      }, 2000);
    }, 2500); // 2.5 seconds Simulation
  };

  const features = [
    "Unlimited CSS / PMS Standard Quizzes",
    "Instant Explanation Note References",
    "Generative AI Tutor Assistance (Gemini)",
    "Custom Quiz Creator with AI Synthesizer",
    "Direct PDF Download Guides",
    "Comprehensive Subjects Strength Graphs",
    "Ad-free Elegant Study Atmosphere"
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      
      <div className="relative bg-white dark:bg-gray-900 w-full max-w-4xl rounded-3xl border border-gray-100 dark:border-gray-800 shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header banner */}
        <div className="relative bg-slate-950 text-white p-6 sm:p-8 text-center border-b border-gray-800">
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 p-1.5 rounded-full bg-white/10 text-white hover:bg-white/20 transition-all"
          >
            <X className="w-5 h-5" />
          </button>

          <Crown className="w-10 h-10 text-amber-400 fill-amber-400 mx-auto animate-bounce mb-3" />
          <h1 className="text-xl sm:text-2xl font-black tracking-tight">Unlock Elite Prepistan Premium</h1>
          <p className="text-xs sm:text-sm text-gray-400 mt-1 max-w-md mx-auto">
            Get comprehensive, premium material with our Duolingo-styled gamification, unlimited mocks, and full Gemini AI tutor companions.
          </p>
        </div>

        {/* Content body */}
        {!selectedPlan ? (
          <div className="p-6 sm:p-8 space-y-6">
            
            {/* Promo coupon helper */}
            <div className="p-4 bg-emerald-50 dark:bg-emerald-950/20 rounded-2xl border border-emerald-200/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center space-x-2 text-xs sm:text-sm text-emerald-800 dark:text-emerald-400">
                <Gift className="w-5 h-5 text-emerald-600 shrink-0" />
                <span>🎉 Promo Alert: Enter test code <strong>PREPISTAN50</strong> during apply to get 50% discount!</span>
              </div>
              
              <div className="flex space-x-1">
                <input
                  type="text"
                  placeholder="Promo Code"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  className="px-3 py-1 text-xs rounded-lg border border-emerald-300 bg-white dark:bg-gray-950 text-emerald-800"
                />
                <button
                  onClick={handleApplyCoupon}
                  className="px-3 py-1 bg-emerald-600 text-white text-xs font-bold rounded-lg hover:bg-emerald-500 transition-colors"
                >
                  Apply
                </button>
              </div>
            </div>

            {couponError && (
              <span className="text-xs text-rose-500 font-bold block">{couponError}</span>
            )}

            {/* Plans List Grid */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {originalPlans.map((plan) => {
                const finalPrice = getPrice(plan.price);
                const isFree = plan.id === "free";
                const isPopular = plan.id === "yearly";

                return (
                  <div 
                    key={plan.id}
                    className={`p-5 rounded-2xl border flex flex-col justify-between transition-all relative ${
                      isPopular 
                        ? "border-emerald-500 bg-emerald-500/5 dark:bg-emerald-950/20 shadow-md ring-2 ring-emerald-500/20" 
                        : "border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 hover:shadow"
                    }`}
                  >
                    {isPopular && (
                      <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 bg-emerald-600 text-white font-mono text-[9px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider">
                        Most Popular
                      </span>
                    )}

                    <div className="space-y-2">
                      <span className="block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">{plan.name}</span>
                      <p className="text-[10px] text-gray-400 leading-normal line-clamp-2">{plan.desc}</p>
                      
                      {/* Price stream */}
                      <div className="py-2">
                        {isFree ? (
                          <span className="text-xl sm:text-2xl font-black text-gray-900 dark:text-white">Free</span>
                        ) : (
                          <div className="flex items-baseline space-x-1">
                            {discountApplied && (
                              <span className="text-xs line-through text-gray-400 font-mono">${plan.price}</span>
                            )}
                            <span className="text-xl sm:text-2xl font-black text-gray-900 dark:text-white">${finalPrice}</span>
                            <span className="text-xs text-gray-400 font-mono">/{plan.period}</span>
                          </div>
                        )}
                      </div>
                    </div>

                    <button
                      onClick={() => handleLaunchCheckout(plan)}
                      className={`w-full py-2 mt-4 text-xs font-bold rounded-xl transition-all ${
                        isFree 
                          ? "bg-gray-50 text-gray-400 pointer-events-none" 
                          : isPopular 
                            ? "bg-emerald-600 hover:bg-emerald-500 text-white shadow" 
                            : "bg-slate-900 hover:bg-black text-white dark:bg-white dark:text-slate-950"
                      }`}
                    >
                      {isFree ? "Current Active" : "Choose Plan"}
                    </button>

                  </div>
                );
              })}
            </div>

            {/* Premium feature rows */}
            <div className="border-t border-gray-100 dark:border-gray-800 pt-6">
              <span className="block text-[11px] font-bold text-gray-400 uppercase tracking-widest text-center mb-4">
                What is Included in Prepistan Premium?
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-2xl mx-auto text-xs text-gray-700 dark:text-gray-300">
                {features.map((feat, i) => (
                  <div key={i} className="flex items-center space-x-2">
                    <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        ) : (
          /* selectedPlan: Launch simulated Stripe or EasyPaisa payment screen */
          <div className="p-6 sm:p-8 max-w-xl mx-auto">
            {!checkoutSuccess ? (
              <div className="space-y-6">
                
                {/* Order Summary banner */}
                <div className="bg-slate-50 dark:bg-slate-950 p-4 rounded-2xl border border-slate-100 dark:border-slate-800 flex justify-between items-center">
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                      {language === "EN" ? "Selected Package" : "منتخب کردہ پیکیج"}
                    </span>
                    <span className="text-sm font-black text-slate-800 dark:text-white block">
                      {selectedPlan.name}
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                      {language === "EN" ? "Price" : "قیمت"}
                    </span>
                    <span className="text-lg font-black text-emerald-600 dark:text-emerald-400 block">
                      ${selectedPlan.price} <span className="text-xs font-normal text-slate-400 font-mono">({selectedPlan.price * 280} PKR)</span>
                    </span>
                  </div>
                </div>

                {/* Payment Method Selector Tabs */}
                {isCardEnabled && isWalletEnabled && (
                  <div className="grid grid-cols-2 gap-2 p-1 bg-slate-100 dark:bg-slate-950 rounded-xl">
                    <button
                      type="button"
                      onClick={() => setPaymentMethod("card")}
                      className={`py-2.5 rounded-lg text-xs font-bold transition-all flex items-center justify-center space-x-1.5 ${
                        paymentMethod === "card"
                          ? "bg-white dark:bg-slate-800 text-slate-800 dark:text-white shadow-sm"
                          : "text-slate-500 dark:text-slate-400 hover:text-slate-800"
                      }`}
                    >
                      <CreditCard className="w-4 h-4" />
                      <span>{language === "EN" ? "Credit/Debit Card" : "کریڈٹ/ڈیبٹ کارڈ"}</span>
                    </button>
                    
                    <button
                      type="button"
                      onClick={() => setPaymentMethod("easypaisa")}
                      className={`py-2.5 rounded-lg text-xs font-bold transition-all flex items-center justify-center space-x-1.5 ${
                        paymentMethod === "easypaisa"
                          ? "bg-emerald-600 text-white shadow-sm"
                          : "text-slate-500 dark:text-slate-400 hover:text-slate-800"
                      }`}
                    >
                      <Smartphone className="w-4 h-4" />
                      <span>{language === "EN" ? "Mobile Wallet" : "موبائل والٹ"}</span>
                    </button>
                  </div>
                )}

                {!isCardEnabled && !isWalletEnabled ? (
                  <div className="p-8 bg-rose-500/5 dark:bg-rose-950/25 border border-rose-500/20 rounded-3xl text-center space-y-3">
                    <AlertCircle className="w-10 h-10 text-rose-500 mx-auto animate-pulse" />
                    <h3 className="text-sm font-black text-slate-800 dark:text-white">All Online Gateways Suspended</h3>
                    <p className="text-xs text-slate-500 leading-relaxed max-w-sm mx-auto">
                      {language === "EN" 
                        ? "The administrator has temporarily deactivated payment methods. Please contact system support or try again later." 
                        : "ایڈمنسٹریٹر نے عارضی طور پر ادائیگی کے طریقے غیر فعال کر دیے ہیں۔ براہ کرم سسٹم سپورٹ سے رابطہ کریں یا بعد میں دوبارہ کوشش کریں۔"}
                    </p>
                    <button
                      type="button"
                      onClick={() => setSelectedPlan(null)}
                      className="px-5 py-2 bg-slate-900 hover:bg-black text-white dark:bg-white dark:text-slate-950 text-xs font-bold rounded-xl transition-all"
                    >
                      {language === "EN" ? "Back to Plans" : "واپس پیکیجز پر جائیں"}
                    </button>
                  </div>
                ) : (paymentMethod === "card" && isCardEnabled) ? (
                  /* Option A: Stripe Secure Card Form */
                  <form onSubmit={handleSubmitCheckout} className="space-y-4">
                    <div className="text-center space-y-1 py-1">
                      <span className="text-[10px] font-bold uppercase text-emerald-600 tracking-wider block">Stripe Secure Gate</span>
                      <h3 className="text-sm font-bold text-slate-800 dark:text-white">Pay Securely via Credit/Debit Card</h3>
                    </div>

                    {paymentConfig.paymentLink && (
                      <div className="p-3.5 bg-emerald-500/5 dark:bg-emerald-950/20 border border-emerald-500/20 rounded-2xl flex flex-col items-center space-y-2 text-center">
                        <span className="text-[10px] font-black tracking-wider text-emerald-600 dark:text-emerald-400 uppercase">⚡ FAST SECURE CHECKOUT</span>
                        <p className="text-[11px] text-slate-600 dark:text-slate-300">Use our direct payment gateway link to unlock premium instantly:</p>
                        <a
                          href={paymentConfig.paymentLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl shadow-md flex items-center space-x-1 transition-all hover:scale-105"
                        >
                          <span>Open Direct Gateway Link</span>
                        </a>
                      </div>
                    )}

                    {/* Card Number */}
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">Card Number</label>
                      <div className="relative">
                        <CreditCard className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                        <input
                          type="text"
                          required
                          placeholder="4242 •••• •••• 4242"
                          value={cardNumber}
                          onChange={(e) => setCardNumber(e.target.value)}
                          className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 text-xs focus:outline-none bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white"
                        />
                      </div>
                    </div>

                    {/* Expiry / CVC */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">Expiry Date</label>
                        <input
                          type="text"
                          required
                          placeholder="MM/YY"
                          value={expiry}
                          onChange={(e) => setExpiry(e.target.value)}
                          className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 text-xs focus:outline-none bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white text-center"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">CVC Code</label>
                        <input
                          type="password"
                          required
                          maxLength={3}
                          placeholder="•••"
                          value={cvc}
                          onChange={(e) => setCvc(e.target.value)}
                          className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 text-xs focus:outline-none bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white text-center"
                        />
                      </div>
                    </div>

                    <div className="p-3 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-200 dark:border-slate-800 text-[10px] text-slate-400 leading-relaxed flex items-start space-x-1.5">
                      <Lock className="w-4 h-4 text-emerald-500 shrink-0" />
                      <span>Your credentials are encrypted via mock Stripe tokenization. Fully secure.</span>
                    </div>

                    <div className="flex space-x-2 pt-2">
                      <button
                        type="button"
                        onClick={() => setSelectedPlan(null)}
                        className="flex-1 py-2.5 border border-slate-200 text-slate-700 dark:border-slate-800 dark:text-slate-300 text-xs font-bold rounded-xl hover:bg-slate-50 dark:hover:bg-slate-950 transition-colors"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        disabled={checkoutLoading}
                        className="flex-1 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-emerald-600/20 flex items-center justify-center space-x-1"
                      >
                        <span>{checkoutLoading ? "Processing payment..." : `Pay $${selectedPlan.price}`}</span>
                      </button>
                    </div>
                  </form>
                ) : (
                  /* Option B: EasyPaisa Manual Transfer Form */
                  <form onSubmit={handleSubmitEasyPaisa} className="space-y-4">
                    
                    {/* EasyPaisa instructions banner */}
                    <div className="p-4 bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-500/20 rounded-2xl space-y-3">
                      <div className="flex items-center space-x-2">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                        <span className="text-xs font-bold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider">
                          {language === "EN" ? "Mobile Wallet Manual Transfer Instructions" : "موبائل والٹ مینوئل منتقلی کی ہدایات"}
                        </span>
                      </div>
                      
                      <div className="text-xs text-slate-700 dark:text-slate-300 space-y-1 font-sans">
                        <p className="font-semibold">
                          {language === "EN" 
                            ? `1. Transfer PKR ${selectedPlan.price * 280} to any of the following accounts:` 
                            : `1. درج ذیل اکاؤنٹس میں سے کسی ایک میں PKR ${selectedPlan.price * 280} منتقل کریں:`}
                        </p>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 my-2 font-mono text-xs">
                          {/* EasyPaisa account */}
                          {isEasyPaisaEnabled && (
                            <div className="p-2.5 bg-white dark:bg-slate-900 rounded-xl border border-emerald-500/10">
                              <span className="text-[9px] text-emerald-600 dark:text-emerald-400 font-bold block font-sans mb-1 uppercase">🟢 EasyPaisa Account</span>
                              <div>
                                <span className="text-[8px] text-slate-400 uppercase block font-sans">Number</span>
                                <span className="font-black text-slate-800 dark:text-slate-200">{paymentConfig.easyPaisaNumber}</span>
                              </div>
                              <div className="mt-1">
                                <span className="text-[8px] text-slate-400 uppercase block font-sans">Title</span>
                                <span className="font-bold text-slate-700 dark:text-slate-300">{paymentConfig.easyPaisaName}</span>
                              </div>
                            </div>
                          )}

                          {/* JazzCash account */}
                          {isJazzCashEnabled && (
                            <div className="p-2.5 bg-white dark:bg-slate-900 rounded-xl border border-amber-500/10">
                              <span className="text-[9px] text-amber-600 dark:text-amber-400 font-bold block font-sans mb-1 uppercase">🔴 JazzCash Account</span>
                              <div>
                                <span className="text-[8px] text-slate-400 uppercase block font-sans">Number</span>
                                <span className="font-black text-slate-800 dark:text-slate-200">{paymentConfig.jazzCashNumber}</span>
                              </div>
                              <div className="mt-1">
                                <span className="text-[8px] text-slate-400 uppercase block font-sans">Title</span>
                                <span className="font-bold text-slate-700 dark:text-slate-300">{paymentConfig.jazzCashName}</span>
                              </div>
                            </div>
                          )}
                        </div>

                        <p className="text-[11px] text-slate-500 leading-relaxed">
                          {language === "EN" 
                            ? "2. After successful transfer, please enter your Transaction ID (TID) and payment receipt details below to verify." 
                            : "2. کامیاب منتقلی کے بعد، تصدیق کے لیے نیچے اپنی ٹرانزیکشن آئی ڈی (TID) اور رسید کی تفصیلات درج کریں۔"}
                        </p>
                      </div>
                    </div>

                    {/* EasyPaisa inputs */}
                    <div className="space-y-3">
                      
                      {/* Sender Mobile Number */}
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                          {language === "EN" ? "Your EasyPaisa Wallet Number" : "آپ کا ایزی پیسہ والٹ نمبر"}
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. 03451234567"
                          value={epMobile}
                          onChange={(e) => setEpMobile(e.target.value)}
                          className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 text-xs focus:outline-none bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white"
                        />
                      </div>

                      {/* Sender Account Name */}
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                          {language === "EN" ? "Account Title (Your Name)" : "اکاؤنٹ ٹائٹل (آپ کا نام)"}
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. Muhammad Ali"
                          value={epName}
                          onChange={(e) => setEpName(e.target.value)}
                          className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 text-xs focus:outline-none bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white"
                        />
                      </div>

                      {/* Transaction ID */}
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                          {language === "EN" ? "EasyPaisa Transaction ID (TID)" : "ٹرانزیکشن آئی ڈی (TID)"}
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. 34091234567"
                          value={epTid}
                          onChange={(e) => setEpTid(e.target.value)}
                          className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 text-xs focus:outline-none bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white font-mono"
                        />
                      </div>

                      {/* Receipt File Upload Zone */}
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider block mb-1">
                          {language === "EN" ? "Proof of Payment Receipt (Optional)" : "ادائیگی کی رسید کا ثبوت (اختیاری)"}
                        </label>
                        
                        <div 
                          onDragOver={(e) => { e.preventDefault(); setEpDragActive(true); }}
                          onDragLeave={() => setEpDragActive(false)}
                          onDrop={(e) => {
                            e.preventDefault();
                            setEpDragActive(false);
                            if (e.dataTransfer.files && e.dataTransfer.files[0]) {
                              setEpReceiptName(e.dataTransfer.files[0].name);
                            }
                          }}
                          className={`border-2 border-dashed rounded-2xl p-4 text-center cursor-pointer transition-all ${
                            epReceiptName 
                              ? "border-emerald-500 bg-emerald-50/10" 
                              : epDragActive 
                                ? "border-emerald-500 bg-emerald-50/20" 
                                : "border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-950"
                          }`}
                        >
                          <input 
                            type="file" 
                            id="ep-receipt-file" 
                            className="hidden" 
                            onChange={(e) => {
                              if (e.target.files && e.target.files[0]) {
                                setEpReceiptName(e.target.files[0].name);
                              }
                            }}
                          />
                          <label htmlFor="ep-receipt-file" className="cursor-pointer block space-y-1.5">
                            <Upload className="w-5 h-5 mx-auto text-slate-400" />
                            <div className="text-[11px] text-slate-600 dark:text-slate-300 font-semibold">
                              {epReceiptName ? (
                                <span className="text-emerald-600 dark:text-emerald-400 flex items-center justify-center space-x-1">
                                  <FileText className="w-3.5 h-3.5" />
                                  <span>{epReceiptName}</span>
                                </span>
                              ) : (
                                <span>{language === "EN" ? "Drag & drop receipt, or Click to browse" : "رسید یہاں ڈریگ کریں، یا کلک کریں"}</span>
                              )}
                            </div>
                            <span className="text-[9px] text-slate-400 block">Supports PDF, JPG, PNG up to 10MB</span>
                          </label>
                        </div>
                      </div>

                    </div>

                    {/* Buttons */}
                    <div className="flex space-x-2 pt-2">
                      <button
                        type="button"
                        onClick={() => setSelectedPlan(null)}
                        className="flex-1 py-2.5 border border-slate-200 text-slate-700 dark:border-slate-800 dark:text-slate-300 text-xs font-bold rounded-xl hover:bg-slate-50 dark:hover:bg-slate-950 transition-colors"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        disabled={checkoutLoading}
                        className="flex-1 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-emerald-600/20 flex items-center justify-center space-x-1"
                      >
                        <span>
                          {checkoutLoading 
                            ? (language === "EN" ? "Verifying TID with EasyPaisa..." : "ایزی پیسہ تصدیق جاری ہے...") 
                            : (language === "EN" ? "Submit EasyPaisa Payment" : "ایزی پیسہ ادائیگی جمع کریں")}
                        </span>
                      </button>
                    </div>

                  </form>
                )}

              </div>
            ) : (
              /* checkoutSuccess celebrate message */
              <div className="text-center py-8 space-y-4 animate-in zoom-in-95 duration-200">
                <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 rounded-full flex items-center justify-center mx-auto shadow-inner">
                  <CheckCircle2 className="w-10 h-10 animate-bounce" />
                </div>
                <div className="space-y-2">
                  <h2 className="text-lg font-black text-slate-800 dark:text-white">
                    {language === "EN" ? "🎉 Payment Submitted Successfully!" : "🎉 ادائیگی کامیابی کے ساتھ جمع ہو گئی!"}
                  </h2>
                  <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto leading-relaxed">
                    {paymentMethod === "card" 
                      ? (language === "EN" 
                        ? "Welcome to Prepistan Elite family. Your student account has been successfully upgraded to Premium."
                        : "پریپستان ایلیٹ فیملی میں خوش آمدید۔ آپ کا اسٹوڈنٹ اکاؤنٹ کامیابی کے ساتھ پریمیم میں اپ گریڈ ہو گیا ہے۔")
                      : (language === "EN"
                        ? `Thank you! Your Transaction ID (${epTid}) has been matched and verified automatically. Your student account is now instantly upgraded to Premium status.`
                        : `شکریہ! آپ کی ٹرانزیکشن آئی ڈی (${epTid}) کا تصدیق نامہ خودکار مینوئل ڈیٹا بیس سے مل گیا ہے۔ آپ کا اسٹوڈنٹ پریمیم اسٹیٹس اب فعال ہے۔`
                      )}
                  </p>
                </div>
              </div>
            )}
          </div>
        )}

      </div>

    </div>
  );
}
