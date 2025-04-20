/**
 * Program IDL in camelCase format in order to be used in JS/TS.
 *
 * Note that this is only a type helper and is not the actual IDL. The original
 * IDL can be found at `target/idl/vesting.json`.
 */
export type Vesting = {
  "address": "6kTVRnYeL3sPYiPEfVb5KmsTCq2iDMaJ3CqKVweQG5LT",
  "metadata": {
    "name": "vesting",
    "version": "0.1.0",
    "spec": "0.1.0",
    "description": "Created with Anchor"
  },
  "instructions": [
    {
      "name": "claimToken",
      "discriminator": [
        116,
        206,
        27,
        191,
        166,
        19,
        0,
        73
      ],
      "accounts": [
        {
          "name": "beneficiary",
          "writable": true,
          "signer": true,
          "relations": [
            "employeeVestingAccount"
          ]
        },
        {
          "name": "employeeVestingAccount",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  101,
                  109,
                  112,
                  108,
                  111,
                  121,
                  101,
                  101,
                  95,
                  118,
                  101,
                  115,
                  116,
                  105,
                  110,
                  103,
                  95,
                  97,
                  99,
                  99,
                  111,
                  117,
                  110,
                  116
                ]
              },
              {
                "kind": "account",
                "path": "beneficiary"
              },
              {
                "kind": "account",
                "path": "vestingAccount"
              }
            ]
          }
        },
        {
          "name": "vestingAccount",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "arg",
                "path": "companyName"
              }
            ]
          },
          "relations": [
            "employeeVestingAccount"
          ]
        },
        {
          "name": "mint",
          "relations": [
            "vestingAccount"
          ]
        },
        {
          "name": "treasuryTokenAccount",
          "writable": true,
          "relations": [
            "vestingAccount"
          ]
        },
        {
          "name": "employeeTokenAccount",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "path": "beneficiary"
              },
              {
                "kind": "account",
                "path": "tokenProgram"
              },
              {
                "kind": "account",
                "path": "mint"
              }
            ],
            "program": {
              "kind": "const",
              "value": [
                140,
                151,
                37,
                143,
                78,
                36,
                137,
                241,
                187,
                61,
                16,
                41,
                20,
                142,
                13,
                131,
                11,
                90,
                19,
                153,
                218,
                255,
                16,
                132,
                4,
                142,
                123,
                216,
                219,
                233,
                248,
                89
              ]
            }
          }
        },
        {
          "name": "tokenProgram"
        },
        {
          "name": "associatedTokenProgram",
          "address": "ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL"
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "companyName",
          "type": "string"
        }
      ]
    },
    {
      "name": "createEmployeeVestingAccount",
      "discriminator": [
        76,
        78,
        223,
        32,
        113,
        78,
        252,
        222
      ],
      "accounts": [
        {
          "name": "owner",
          "writable": true,
          "signer": true,
          "relations": [
            "vestingAccount"
          ]
        },
        {
          "name": "beneficiary"
        },
        {
          "name": "vestingAccount"
        },
        {
          "name": "employeeVestingAccount",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  101,
                  109,
                  112,
                  108,
                  111,
                  121,
                  101,
                  101,
                  95,
                  118,
                  101,
                  115,
                  116,
                  105,
                  110,
                  103,
                  95,
                  97,
                  99,
                  99,
                  111,
                  117,
                  110,
                  116
                ]
              },
              {
                "kind": "account",
                "path": "beneficiary"
              },
              {
                "kind": "account",
                "path": "vestingAccount"
              }
            ]
          }
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "startTime",
          "type": "i64"
        },
        {
          "name": "cliffTime",
          "type": "i64"
        },
        {
          "name": "endTime",
          "type": "i64"
        },
        {
          "name": "totalAmountVested",
          "type": "u64"
        }
      ]
    },
    {
      "name": "createEmployerVestingAccount",
      "discriminator": [
        216,
        104,
        218,
        158,
        29,
        146,
        186,
        96
      ],
      "accounts": [
        {
          "name": "signer",
          "writable": true,
          "signer": true
        },
        {
          "name": "vestingAccount",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "arg",
                "path": "companyName"
              }
            ]
          }
        },
        {
          "name": "mint"
        },
        {
          "name": "treasuryTokenAccount",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  118,
                  101,
                  115,
                  116,
                  105,
                  110,
                  103,
                  95,
                  116,
                  114,
                  101,
                  97,
                  115,
                  117,
                  114,
                  121
                ]
              },
              {
                "kind": "arg",
                "path": "companyName"
              }
            ]
          }
        },
        {
          "name": "tokenProgram"
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "companyName",
          "type": "string"
        }
      ]
    }
  ],
  "accounts": [
    {
      "name": "employeeVestingAccount",
      "discriminator": [
        2,
        60,
        155,
        131,
        145,
        78,
        88,
        101
      ]
    },
    {
      "name": "vestingAccount",
      "discriminator": [
        102,
        73,
        10,
        233,
        200,
        188,
        228,
        216
      ]
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "invalidStartTime",
      "msg": "The provided start time is not a valid"
    },
    {
      "code": 6001,
      "name": "invalidCliffTime",
      "msg": "The provided cliff time is not a valid"
    },
    {
      "code": 6002,
      "name": "invalidEndTime",
      "msg": "The provided end time is not a valid"
    },
    {
      "code": 6003,
      "name": "invalidTotalAmountVested",
      "msg": "The provided total amount vested is not a valid"
    },
    {
      "code": 6004,
      "name": "invalidTotalAmountClaimed",
      "msg": "The provided total amount claimed is not a valid"
    },
    {
      "code": 6005,
      "name": "claimNotAvailableYet",
      "msg": "Claim not available yet"
    },
    {
      "code": 6006,
      "name": "invalidVestingDuration",
      "msg": "The provided vesting duration is not a valid"
    },
    {
      "code": 6007,
      "name": "calculationErrorInVestedAmount",
      "msg": "Calculation error in total amount claimed"
    },
    {
      "code": 6008,
      "name": "noTokenLeftToClaim",
      "msg": "No tokens Left to Claim"
    },
    {
      "code": 6009,
      "name": "claimableVestedTokenExceedsAlottedVestedToken",
      "msg": "Claimable amount exceeds the total amount claimed"
    }
  ],
  "types": [
    {
      "name": "employeeVestingAccount",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "beneficiary",
            "type": "pubkey"
          },
          {
            "name": "startTime",
            "type": "i64"
          },
          {
            "name": "cliffTime",
            "type": "i64"
          },
          {
            "name": "endTime",
            "type": "i64"
          },
          {
            "name": "totalAmountVested",
            "type": "u64"
          },
          {
            "name": "totalAmountClaimed",
            "type": "u64"
          },
          {
            "name": "vestingAccount",
            "type": "pubkey"
          },
          {
            "name": "bump",
            "type": "u8"
          }
        ]
      }
    },
    {
      "name": "vestingAccount",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "owner",
            "type": "pubkey"
          },
          {
            "name": "mint",
            "type": "pubkey"
          },
          {
            "name": "treasuryTokenAccount",
            "type": "pubkey"
          },
          {
            "name": "companyName",
            "type": "string"
          },
          {
            "name": "treasuryBump",
            "type": "u8"
          },
          {
            "name": "bump",
            "type": "u8"
          }
        ]
      }
    }
  ]
};
