import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';
import { Phone, ArrowLeft, Shield, Heart } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';

interface PhoneLoginProps {
  onClose: () => void;
  onSuccess: () => void;
}

const PhoneLogin = ({ onClose, onSuccess }: PhoneLoginProps) => {
  const [step, setStep] = useState<'phone' | 'otp'>('phone');
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const { signInWithOtp, verifyOtp } = useAuth();
  const { toast } = useToast();

  const formatPhoneNumber = (value: string) => {
    // Remove non-digits
    const digits = value.replace(/\D/g, '');
    return digits.slice(0, 10);
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhone(formatPhoneNumber(e.target.value));
  };

  const handleSendOtp = async () => {
    if (phone.length !== 10) {
      toast({
        title: "Invalid Phone Number",
        description: "Please enter a valid 10-digit mobile number",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    const fullPhone = `+91${phone}`;
    const { error } = await signInWithOtp(fullPhone);
    setLoading(false);

    if (error) {
      toast({
        title: "Failed to send OTP",
        description: error.message,
        variant: "destructive",
      });
    } else {
      toast({
        title: "OTP Sent!",
        description: `Verification code sent to +91 ${phone}`,
      });
      setStep('otp');
    }
  };

  const handleVerifyOtp = async () => {
    if (otp.length !== 6) {
      toast({
        title: "Invalid OTP",
        description: "Please enter the 6-digit verification code",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    const fullPhone = `+91${phone}`;
    const { error } = await verifyOtp(fullPhone, otp);
    setLoading(false);

    if (error) {
      toast({
        title: "Verification Failed",
        description: error.message,
        variant: "destructive",
      });
    } else {
      toast({
        title: "Welcome!",
        description: "You have successfully logged in",
      });
      onSuccess();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/95 backdrop-blur-sm p-4">
      <Card variant="elevated" className="w-full max-w-md animate-fade-in">
        <CardHeader className="text-center pb-2">
          <button 
            onClick={onClose}
            className="absolute left-4 top-4 p-2 rounded-full hover:bg-secondary transition-colors"
          >
            <ArrowLeft className="h-5 w-5 text-muted-foreground" />
          </button>
          
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10">
            <Heart className="h-8 w-8 text-primary" />
          </div>
          <CardTitle className="text-xl">Welcome to Sahayak+</CardTitle>
          <p className="text-sm text-muted-foreground mt-1">
            {step === 'phone' 
              ? 'Enter your phone number to continue' 
              : 'Enter the verification code'}
          </p>
        </CardHeader>

        <CardContent className="space-y-6">
          {step === 'phone' ? (
            <>
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Mobile Number</label>
                <div className="flex gap-2">
                  <div className="flex h-12 items-center justify-center rounded-lg border border-input bg-secondary/50 px-3">
                    <span className="text-sm font-medium text-muted-foreground">+91</span>
                  </div>
                  <Input
                    type="tel"
                    placeholder="Enter 10-digit number"
                    value={phone}
                    onChange={handlePhoneChange}
                    className="flex-1 h-12 text-lg"
                    maxLength={10}
                  />
                </div>
              </div>

              <Button 
                onClick={handleSendOtp} 
                className="w-full" 
                size="lg"
                disabled={loading || phone.length !== 10}
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                    Sending OTP...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <Phone className="h-5 w-5" />
                    Send OTP
                  </span>
                )}
              </Button>
            </>
          ) : (
            <>
              <div className="space-y-4">
                <div className="text-center">
                  <p className="text-sm text-muted-foreground">
                    Code sent to <span className="font-semibold text-foreground">+91 {phone}</span>
                  </p>
                  <button 
                    onClick={() => setStep('phone')} 
                    className="text-sm text-primary hover:underline mt-1"
                  >
                    Change number
                  </button>
                </div>

                <div className="flex justify-center">
                  <InputOTP value={otp} onChange={setOtp} maxLength={6}>
                    <InputOTPGroup>
                      <InputOTPSlot index={0} />
                      <InputOTPSlot index={1} />
                      <InputOTPSlot index={2} />
                      <InputOTPSlot index={3} />
                      <InputOTPSlot index={4} />
                      <InputOTPSlot index={5} />
                    </InputOTPGroup>
                  </InputOTP>
                </div>

                <button 
                  onClick={handleSendOtp}
                  className="w-full text-sm text-primary hover:underline"
                  disabled={loading}
                >
                  Resend OTP
                </button>
              </div>

              <Button 
                onClick={handleVerifyOtp} 
                className="w-full" 
                size="lg"
                disabled={loading || otp.length !== 6}
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                    Verifying...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <Shield className="h-5 w-5" />
                    Verify & Continue
                  </span>
                )}
              </Button>
            </>
          )}

          <p className="text-center text-xs text-muted-foreground">
            By continuing, you agree to our Terms of Service and Privacy Policy
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default PhoneLogin;
