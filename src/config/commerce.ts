/** Website plans prepared for review. App Store billing remains separate. */
export const WEBSITE_COMMERCE = {
  status: "pending",
  provider: "Paddle",
  legalEntity: "Guangzhou Axing E - Commerce Co., Ltd.",
  currency: "USD",
  taxesIncluded: false,
  plans: {
    monthly: {amountMinor: 1299},
    yearly: {amountMinor: 9999},
  },
  customerSupportUrl: "https://paddle.net",
  refundPolicyUrl: "https://www.paddle.com/legal/refund-policy",
  privacyPolicyUrl: "https://www.paddle.com/legal/privacy",
  buyerTermsUrl: "https://www.paddle.com/legal/checkout-buyer-terms",
  appleRefundUrl: "https://reportaproblem.apple.com",
} as const;
