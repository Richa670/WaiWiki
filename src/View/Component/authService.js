

// Mock function for sending OTP
export const sendOtp = async (email: string): Promise<void> => {
    console.log(`OTP sent to ${email}`);
    // In a real app, replace with actual API call:
    // return axios.post('/api/send-otp', { email });
    return new Promise(resolve => setTimeout(resolve, 1000));
  };
  

  
  // Mock function for verifying OTP
// authService.js
export const verifyOtp = async (email, otp) => {
  const response = await fetch('/api/verify-otp', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, otp }),
  });
  
  if (!response.ok) {
    throw new Error('OTP verification failed');
  }
  
  return response.json();
};