# 🛍️ Motion Mart(Next.js) Product Management App

A simple **Next.js 15 (App Router)** application demonstrating public and protected routes with **NextAuth.js** authentication.  
Users can browse products publicly, view product details, and after logging in, access a protected dashboard to add new products.
Live Link: https://motion-mart.vercel.app/
---

## 🚀 Features

### Public Pages
- **Landing Page (/)**  
  - Includes Navbar, Hero, Product Highlights, Footer  
  - Navigation to login and products  

- **Login (/login)**  
  - Authentication with NextAuth.js  
  - Supports Google OAuth or Credentials  
  - Redirects to `/products` on successful login  

- **Product List Page (/products)**  
  - Publicly accessible  
  - Displays list of products from mock backend/file  
  - Each product shows name, description, price, and a details button  

- **Product Details Page (/products/[id])**  
  - Publicly accessible  
  - Shows full details of a single product  

### Protected Page
- **Add Product (/dashboard/add-product)**  
  - Accessible **only when logged in**  
  - Form to add new product (stores data in DB or mock API)  
  - Redirects unauthenticated users to `/login`  

---

## ✨ Optional Enhancements
- Loading spinner on form submission  
- Toast message after adding product successfully  
- Theme toggle (light/dark mode)  

---

## 🛠️ Technologies
- [Next.js 15 (App Router)](https://nextjs.org/)  
- [NextAuth.js](https://next-auth.js.org/) for authentication  
- Tailwind CSS (UI styling)  
- API Routes (`/api`) or Express.js for backend data  

---

## ⚙️ Setup & Installation

1. **Clone the repo**
   ```bash
   git clone https://github.com/MdMubashirulAhsan/motion-mart.git
   cd motion-mart

## 📂 Route Summary
| Route                    | Type      | Description                                 |
| ------------------------ | --------- | ------------------------------------------- |
| `/`                      | Public    | Landing page with 4 sections                |
| `/login`                 | Public    | NextAuth login page                         |
| `/products`              | Public    | List of products                            |
| `/products/[id]`         | Public    | Product details page                        |
| `/dashboard/add-product` | Protected | Add product form (only for logged in users) |

