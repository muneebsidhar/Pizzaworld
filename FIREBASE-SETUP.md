# 🔥 Phase 2 Setup Guide — Pizza World Live Order System

**Laptop mein kuch install NAHI karna!** Sirf browser chahiye. 10 minute ka kaam.

---

## Step 1: Firebase project banao (FREE)

1. Jao: **https://console.firebase.google.com**
2. Apne Google account se login karo
3. **"Add project"** dabao → naam likho `pizza-world` → **Continue**
4. Google Analytics wala option **OFF** karke → **Create project**

## Step 2: Realtime Database on karo

1. Left side menu → **Build** → **Realtime Database** → **Create Database**
2. Location: koi bhi (e.g. `asia-southeast1`) → Next
3. **"Start in test mode"** select karo → **Enable**

## Step 3: Website ko database se connect karo

1. Upar left corner mein ⚙️ **gear icon** → **Project settings**
2. Neeche scroll karo → **"Your apps"** → **`</>`** (web icon) dabao
3. Nickname: `pizza-web` → **Register app**
4. Jo `firebaseConfig` code nazar aaye, uski values copy karke
   **`js/firebase-config.js`** file mein paste kar do (har `PASTE_YOUR_...`
   wali jagah apni value likho)

## Step 4: Security rules lagao

1. Firebase console → **Realtime Database** → **Rules** tab
2. Neeche wala code paste karo → **Publish**:

```json
{
  "rules": {
    "pw": {
      "orders": {
        ".read": true,
        ".indexOn": "createdAt",
        "$order": {
          ".write": true,
          ".validate": "newData.hasChildren(['id','items','name','phone','status'])"
        }
      },
      "counter": { ".read": true, ".write": true }
    }
  }
}
```

## Step 5: Kitchen password badlo (optional lekin recommended)

`js/firebase-config.js` mein ye line hai:

```js
const KITCHEN_PASSWORD = "pizza123";
```

`pizza123` ki jagah apna password likh do. Ye password restaurant wale ko dena hai.

---

## ✅ Test karo

1. `checkout.html` kholo → order karo → **Order ID** milega (jaise `PW-1001`)
   + **"📍 Track my order live"** ka button
2. `kitchen.html` kholo → password daalo → order nazar aayega + **🔔 ghanti** bajegi
3. Kitchen mein **"👨‍🍳 Preparing"** dabao → `track.html?id=PW-1001` pe
   customer ki screen **khud-ba-khud** update ho jayegi!

## 📱 Roz ka istemal

| Kaun | Kya kare |
|---|---|
| **Customer** | Website se order → Order ID milta hai → `track.html` pe live status |
| **Kitchen/Rider** | `kitchen.html` khula rakho → naya order pe ghanti → button dabate jao |
| **Tum (Muneeb)** | Kuch nahi! Sab automatic 😎 |

## ❓ Common sawal

**Q: Firebase free hai?**
A: Haan, 100% free. Realtime Database ka free plan ek chhote restaurant ke liye kaafi hai (GBs ka data).

**Q: Internet na ho to?**
A: Order ke liye internet zaroori hai (jaise WhatsApp ke liye hota hai). Kitchen dashboard bhi internet pe chalta hai.

**Q: Config paste kiye baghair site chalegi?**
A: Haan! Firebase configure na ho to site **WhatsApp-only mode** mein chalti hai — koi error nahi aayega. Order bas database mein save nahi hoga.

**Q: Kitchen password kitna secure hai?**
A: Ye basic protection hai (chhoti dukaan ke liye theek). Agar kabhi bara system chahiye hua to proper login lagayenge — Phase 3 mein.
