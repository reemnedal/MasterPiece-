import React from 'react';
import { Check } from 'lucide-react';

const subscriptionPlans = [
  {
    plan_id: 1,
    plan_name: 'Basic Plan',
    monthly_fee: 9.99,
    description: 'Perfect for individuals just getting started',
    features: [
      'Access to basic features',
      'Email support',
      '5GB storage',
      '1 user account',
      'Basic analytics'
    ],
    recommended: false
  },
  {
    plan_id: 2,
    plan_name: 'Standard Plan',
    monthly_fee: 19.99,
    description: 'Great for growing teams',
    features: [
      'All Basic features',
      'Priority email support',
      '15GB storage',
      '5 user accounts',
      'Advanced analytics',
      'API access',
      'Custom integrations'
    ],
    recommended: true
  },
  {
    plan_id: 3,
    plan_name: 'Premium Plan',
    monthly_fee: 29.99,
    description: 'For enterprises requiring maximum power',
    features: [
      'All Standard features',
      '24/7 phone support',
      'Unlimited storage',
      'Unlimited users',
      'Custom analytics',
      'Priority API access',
      'Dedicated account manager',
      'Custom development',
      'SLA guarantee'
    ],
    recommended: false
  }
];

const SubscriptionPlans = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-[#704e81] mb-4">
            Choose Your Perfect Plan
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Select the plan that best suits your needs. All plans include our core features with additional benefits as you scale.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
          {subscriptionPlans.map((plan) => (
            <div
              key={plan.plan_id}
              className={`relative bg-white rounded-2xl shadow-xl overflow-hidden transition-all duration-300 hover:shadow-2xl transform hover:-translate-y-1 ${
                plan.recommended ? 'border-2 border-[#704e81]' : ''
              }`}
            >
              {plan.recommended && (
                <div className="absolute top-0 right-0 bg-[#704e81] text-white px-4 py-1 rounded-bl-lg text-sm font-medium">
                  Recommended
                </div>
              )}
              
              <div className="p-8">
                <h3 className="text-2xl font-bold text-[#704e81] mb-2">
                  {plan.plan_name}
                </h3>
                <p className="text-gray-600 mb-4">{plan.description}</p>
                <div className="flex items-baseline mb-8">
                  <span className="text-4xl font-bold text-[#704e81]">
                    ${plan.monthly_fee.toFixed(2)}
                  </span>
                  <span className="text-gray-500 ml-2">/month</span>
                </div>
                
                <div className="space-y-4">
                  {plan.features.map((feature, index) => (
                    <div key={index} className="flex items-center">
                      <Check className="h-5 w-5 text-[#704e81] mr-3 flex-shrink-0" />
                      <span className="text-gray-600">{feature}</span>
                    </div>
                  ))}
                </div>
                
                <button className={`w-full mt-8 px-6 py-3 rounded-lg text-lg font-medium transition-colors duration-200 ${
                  plan.recommended
                    ? 'bg-[#704e81] text-white hover:bg-[#5b3c6b]'
                    : 'bg-gray-100 text-[#704e81] hover:bg-gray-200'
                }`}>
                  Get Started
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-500">
            All plans include a 14-day free trial. No credit card required.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionPlans;