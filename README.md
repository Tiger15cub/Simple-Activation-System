# Simple Activation System
I have created a simple activation system, this activation sytem uses mongoDB and is super secure! You must generate a key using the internal API before any application can be activated with it.
The ideal use for this is:
 - A user creates an account and is emailed a key
 - A user purchases software and is emailed a key
 - Anything where a user receves a key.

# Planned featues
- [ ] Accounts
- [x] Allow for activation using the External API
- [x] Private internal API used to generate, delete, block and unblock keys
- [x] External API that applications can access

# Config
Please refer to the config.json files in both APIs, they are self explanitory.
