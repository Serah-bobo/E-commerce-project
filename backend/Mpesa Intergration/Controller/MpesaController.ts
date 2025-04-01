import { getAccessToken } from "../Config/MpesaAuth";
import { Request, Response } from 'express'
import dotenv from 'dotenv'
dotenv.config()
const shortCode =process.env.MPESA_SHORTCODE;
const passKey=process.env.MPESA_PASSKEY;
const handleStkPush=async(res:Response,req:Request):Promise<void>=>{
    const { phone, amount } = req.body;
    if (!phone || !amount) {
        res.status(400).json({ error: 'Phone number and amount are required' });
        return;
      }
      const token=await getAccessToken()
      if (!token) {
        res.status(500).json({ error: 'Failed to get access token' });
        return;
      }
    
      const timestamp = new Date().toISOString().replace(/[-:.TZ]/g, '').slice(0, 14);
      const password=Buffer.from(`${shortCode}${passKey}${timestamp}`).toString('base64');

      const requestBody = {
        BusinessShortCode: process.env.MPESA_SHORTCODE,
        Password: password,
        Timestamp: timestamp,
        TransactionType: 'CustomerPayBillOnline',
        Amount: amount,
        PartyA: phone,
        PartyB: process.env.MPESA_SHORTCODE,
        PhoneNumber: phone,
        CallBackURL: process.env.CALLBACK_URL,
        AccountReference: 'Buy online shop',
        TransactionDesc: 'Payment for crochet items'
      };

      try {
        const response = await fetch('https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(requestBody)
        });
    
        const data = await response.json();
        res.json(data);
      } catch (error) {
        console.error('❌ STK Push Error:', error);
        res.status(500).json({ error: 'STK Push failed' });
      }
}