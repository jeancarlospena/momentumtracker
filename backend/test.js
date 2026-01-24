console.log('helle world')
export const testingObject = {
  "id": "3K466255GN4874143",
  "paymentSource": {
    "paypal": {
      "emailAddress": "sb-43v0sy27145819@personal.example.com",
      "accountId": "H75V6E2HFF52Q",
      "accountStatus": "VERIFIED",
      "name": {
        "givenName": "Chris",
        "surname": "Buy"
      },
      "address": {
        "countryCode": "US"
      }
    }
  },
  "payer": {
    "emailAddress": "sb-43v0sy27145819@personal.example.com",
    "payerId": "H75V6E2HFF52Q",
    "name": {
      "givenName": "Chris",
      "surname": "Buy"
    },
    "address": {
      "countryCode": "US"
    }
  },
  "purchaseUnits": [
    {
      "referenceId": "default",
      "shipping": {
        "name": {
          "fullName": "Chris Buy"
        },
        "address": {
          "addressLine1": "1 Main St",
          "adminArea2": "San Jose",
          "adminArea1": "CA",
          "postalCode": "95131",
          "countryCode": "US"
        }
      },
      "payments": {
        "captures": [
          {
            "status": "COMPLETED",
            "id": "6BX5460556754070T",
            "amount": {
              "currencyCode": "USD",
              "value": "69.00"
            },
            "sellerProtection": {
              "status": "ELIGIBLE",
              "disputeCategories": [
                "ITEM_NOT_RECEIVED",
                "UNAUTHORIZED_TRANSACTION"
              ]
            },
            "finalCapture": true,
            "sellerReceivableBreakdown": {
              "grossAmount": {
                "currencyCode": "USD",
                "value": "69.00"
              },
              "paypalFee": {
                "currencyCode": "USD",
                "value": "2.90"
              },
              "netAmount": {
                "currencyCode": "USD",
                "value": "66.10"
              }
            },
            "links": [
              {
                "href": "https://api.sandbox.paypal.com/v2/payments/captures/6BX5460556754070T",
                "rel": "self",
                "method": "GET"
              },
              {
                "href": "https://api.sandbox.paypal.com/v2/payments/captures/6BX5460556754070T/refund",
                "rel": "refund",
                "method": "POST"
              },
              {
                "href": "https://api.sandbox.paypal.com/v2/checkout/orders/3K466255GN4874143",
                "rel": "up",
                "method": "GET"
              }
            ],
            "createTime": "2025-10-19T14:06:34Z",
            "updateTime": "2025-10-19T14:06:34Z"
          }
        ]
      }
    }
  ],
  "status": "COMPLETED",
  "links": [
    {
      "href": "https://api.sandbox.paypal.com/v2/checkout/orders/3K466255GN4874143",
      "rel": "self",
      "method": "GET"
    }
  ]
}