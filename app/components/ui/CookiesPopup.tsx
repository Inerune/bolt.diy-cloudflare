import { useState, useEffect } from "react";
import { Dialog, DialogTitle, DialogDescription, DialogButton } from "@/components/ui/Dialog";
import * as RadixDialog from "@radix-ui/react-dialog";

const CookiePopup = () => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    // Check localStorage for existing preference
    const consentGiven = localStorage.getItem('cookieConsent');
    if (consentGiven !== null) return;

    // Show after random delay (5-8 seconds)
    const delay = 5000 + Math.random() * 3000;
    const timer = setTimeout(() => {
      setOpen(true);
    }, delay);

    return () => clearTimeout(timer);
  }, []);

  const handleResponse = (accepted: boolean) => {
    // Save preference
    localStorage.setItem('cookieConsent', String(accepted));
    
    // Set cookies if accepted
    if (accepted) {
      document.cookie = `necessary=true; max-age=${30*24*60*60}; path=/; Secure; SameSite=Lax`;
      document.cookie = `analytics=true; max-age=${30*24*60*60}; path=/; Secure; SameSite=Lax`;
    } else {
      document.cookie = `necessary=true; max-age=${30*24*60*60}; path=/; Secure; SameSite=Lax`;
      document.cookie = `analytics=; max-age=0; path=/`; // Clear if exists
    }

    setOpen(false);
  };

  return (
    <RadixDialog.Root open={open}>
      <RadixDialog.Portal>
        <RadixDialog.Overlay className="fixed inset-0 bg-black/50" />
        <Dialog>
          <div className="p-6 text-center">
            <DialogTitle className='w-[50%] mx-auto mt-7'>
              We Value Your Privacy
            </DialogTitle>
            <DialogDescription>
              We use cookies to enhance your experience.
              <br />
              By continuing, you agree to our use of cookies.
            </DialogDescription>
            <div className="mt-7 gap-5 flex items-center justify-center">
              <DialogButton 
                type="secondary" 
                onClick={() => handleResponse(false)}
              >
                Decline
              </DialogButton>
              <DialogButton 
                type="primary" 
                onClick={() => handleResponse(true)}
              >
                Accept
              </DialogButton>
            </div>
          </div>
        </Dialog>
      </RadixDialog.Portal>
    </RadixDialog.Root>
  );
};

export default CookiePopup;