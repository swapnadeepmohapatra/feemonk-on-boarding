import { load } from '@cashfreepayments/cashfree-js';


  let cashfree;

  let initializeSDK = async function () {
    cashfree = await load({
       mode: "production",  // Change to "sandbox" when you want to use test
      //mode: "sandbox",  // Change to "production" when you want to use live
    });
    console.log("this is cashfree", cashfree);
  };

  initializeSDK();

  // subscriptions checout

 export const SubscriptionsCheckoutSdk = (sessionIdProp) => {
  initializeSDK();
  
    try {
      let sessionId = sessionIdProp;

      let checkoutOptions = {
        subsSessionId: sessionId,
        redirectTarget: "_modal",
      };

      cashfree.subscriptionsCheckout(checkoutOptions).then((res) => {
        console.log("Subscription payment initialized", res);
        return res
      });
    } catch (error) {
      console.log(error);
      return console.error(error);
    }
  } 

    

  

  
