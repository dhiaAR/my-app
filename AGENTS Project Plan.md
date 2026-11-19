# Parfum de Tunisie: Project Plan

## 1. Overview

A web app for a Tunisian travel agency that organizes trips (one city or several) with hotels and its own private buses. Clients browse trips and submit booking requests. Payment is arranged outside the site. Admins manage trips, clients, bookings, messages, and analytics.

**Roles:** Client, Admin, Super Admin (only one).

---

## 2. Features

### Client side
- Home page styled like the Facebook main page, with a red theme representing Tunisia.
- Feed of ads showing planned trips that can be booked.
- Two filters: by month, or by price.
- Clicking a trip opens its page, which has a booking form (the agency then contacts the client to arrange payment outside the website).
- The booking form can only be submitted by a logged-in client. Anonymous visitors must log in or create an account first.
- "About us" page with details about the agency.
- "Contact us" page with a form to ask a question or report a problem (same login rule as booking).

### Normal admin
- **Trips page:** create, edit, delete trips. Trip status is visible to clients and admins, but only an admin can change it: `OPEN`, `LAST_SEAT`, `FINISHED`, `CANCELLED`.
- **Clients page:** view all client accounts. Mark clients as active/loyal, or as inactive (no bookings for at least 2 months after creating the account).
- **Bookings page:** view booking forms. Delete (trip done or client cancelled). Change status: `OPEN` (first status), `CONFIRMED`, `CANCELLED`.
- **Contact messages page:** same idea, with statuses `OPEN` or `RESOLVED`.
- **Analytics page:** big chart of the cities with the most booked trips per 6 months. When a trip is marked `FINISHED`, each city in the trip gets 1 point.

### Super admin (only one)
- Everything a normal admin can do, plus:
- Create other normal admins, delete them, or block them. A blocked admin can't log in, and if already logged in is logged out instantly.
- Delete client accounts when needed.

### Security
- Clients confirm by email every time they log in.
- Admins use a token from an authenticator app on their phone.

---

## 3. Tech Stack (all JavaScript, no TypeScript)

| Need | Choice | Why |
|---|---|---|
| Framework | Next.js (App Router) | Frontend and backend in one project |
| Styling | Tailwind CSS | Fast, avoids fighting with CSS files |
| Database | PostgreSQL (Neon or Supabase, free tier) | Trips, cities, and bookings are relational |
| ORM | Prisma | Readable queries, easy migrations |
| Auth | Auth.js (NextAuth) with database sessions | Email sign-in, and sessions you can delete to force logout |
| Emails | Resend (or Nodemailer + Gmail for testing) | Sending login codes and links |
| Admin 2FA | `otplib` + `qrcode` | Standard authenticator-app codes (TOTP) |
| Charts | Recharts | Simple bar charts in React |
| Validation | Zod | Validate every form on the server |
| Hosting | Vercel + the hosted database | Free and simple |

---

## 4. Key Decisions (change them if you disagree)

1. **Passwordless login for clients.** The client enters their email, you send a sign-in link or code, and that is the "confirm with email every time" requirement. The first sign-in creates the account, so there are no passwords to store or leak.
2. **Database sessions, not JWT.** When an admin is blocked or a client is deleted, you delete their session rows and they are logged out instantly. JWT tokens can't be cancelled that easily.
3. **Admin 2FA = email sign-in plus authenticator code.** On the first login, an admin scans a QR code to set up the app. After that, every login needs the 6-digit code.
4. **Role checks happen on the server**, in every page and every action. Hiding a button is never security.
5. **One super admin** is created by a seed script, not through the website.

---

## 5. Pages

**Public / client**
- `/` Home feed (trip cards, filters)
- `/trips/[id]` Trip details and booking form
- `/about`
- `/contact` (contact or report form, login required)
- `/login`
- `/my-bookings` (optional but useful: the client sees their request status)

**Admin** (`/admin/...`)
- `/admin/trips` list, create, edit, delete
- `/admin/clients`
- `/admin/bookings`
- `/admin/messages`
- `/admin/analytics`
- `/admin/admins` (super admin only)

---

## 6. Database Design

- **User**: id, name, email, phone, role (`CLIENT` / `ADMIN` / `SUPER_ADMIN`), isBlocked, clientTag (`NONE` / `LOYAL` / `INACTIVE`), totpSecret, totpEnabled, createdAt
- **Session / Account / VerificationToken**: the tables Auth.js requires
- **City**: id, name
- **Hotel**: id, name, cityId, stars (optional)
- **Trip**: id, title, description, price, startDate, endDate, imageUrl, status (`OPEN` / `LAST_SEAT` / `FINISHED` / `CANCELLED`), finishedAt, createdAt
- **TripStop**: tripId, cityId, hotelId, nights, order. This is what makes a trip multi-city.
- **Booking**: id, userId, tripId, fullName, phone, email, numberOfPeople, notes, status (`OPEN` / `CONFIRMED` / `CANCELLED`), createdAt
- **ContactMessage**: id, userId, subject, message, type (`QUESTION` / `PROBLEM`), status (`OPEN` / `RESOLVED`), createdAt

**Analytics rule:** when a trip is set to `FINISHED`, store `finishedAt`. Each city in its stops gets 1 point. Count points where `finishedAt` falls in the chosen 6-month window.

**Inactive client rule:** a client with no bookings and an account older than 2 months is *suggested* as inactive. The admin makes the final decision with the tag.

---

## 7. Folder Structure

```
src/
  app/
    (public)/            home, trips/[id], about, contact, login
    admin/               trips, clients, bookings, messages, analytics, admins
    api/auth/            Auth.js route
  components/            TripCard, Navbar, FilterBar, forms, charts
  lib/                   prisma.js, auth.js, permissions.js, email.js, totp.js
  actions/               server actions (createBooking, updateTripStatus, ...)
prisma/
  schema.prisma
  seed.js                super admin + sample cities, hotels, trips
```

---

## 8. Step-by-Step Build Plan

Each phase ends with something that works. Don't start the next phase until the "Done when" line is true.

### Phase 0: Setup
- [ ] Create the Next.js app, install Tailwind, set up Git and GitHub.
- [ ] Create the database and connect Prisma.
- **Done when:** the app runs locally and Prisma connects to the database.

### Phase 1: Data models and seed
- [ ] Write the Prisma schema for City, Hotel, Trip, TripStop, then migrate.
- [ ] Write `seed.js` with about 8 cities, a few hotels, and 6 to 8 sample trips (single and multi-city).
- **Done when:** you can see the seeded data in Prisma Studio.

### Phase 2: Layout and red theme
- [ ] Build the Navbar, a Facebook-style three-column layout (filters on the left, trip feed in the middle, a small side panel on the right), and the footer.
- [ ] Define the red palette in the Tailwind config.
- [ ] Make it responsive (the filters collapse on mobile).
- **Done when:** the layout looks right on phone and desktop with static content.

### Phase 3: Home feed and filters
- [ ] Fetch trips from the database and render `TripCard`s (image, cities, dates, price, status badge).
- [ ] Filter by month and filter by price (a range or sorting). Put the filters in the URL (`/?month=7&maxPrice=500`) so they can be shared.
- [ ] Hide or grey out `FINISHED` and `CANCELLED` trips on the home feed.
- **Done when:** the filters change the displayed trips.

### Phase 4: Trip details page
- [ ] Show the full itinerary (stops in order, hotels, nights), price, dates, and status.
- [ ] Leave a placeholder where the booking form will go.
- **Done when:** clicking a card opens the correct trip page.

### Phase 5: Static pages
- [ ] Build About us.
- [ ] Build the Contact form UI only, without saving yet.
- **Done when:** both pages are in the navbar and look finished.

### Phase 6: Client authentication
- [ ] Set up Auth.js with the Prisma adapter, database sessions, and the email provider.
- [ ] Build the `/login` page, send the email, and show the logged-in state in the navbar with a logout button.
- [ ] Ask for the name and phone number on the first login.
- [ ] Write a helper `requireUser()` that all protected actions call.
- **Done when:** you can sign in by email, log out, and the session lives in the database.

### Phase 7: Booking form
- [ ] Build the form on the trip page. Anonymous visitors see "Log in to book" instead.
- [ ] Add a server action that checks login, validates with Zod, checks that the trip status is `OPEN` or `LAST_SEAT`, and saves a Booking with status `OPEN`.
- [ ] Show a success message, and build `/my-bookings`.
- **Done when:** a logged-in client can submit and the row exists in the database. An anonymous POST is rejected.

### Phase 8: Contact form
- [ ] Reuse the same pattern as the booking form (login required, Zod, save as `OPEN`).
- **Done when:** a message is saved and appears on the client's side.

### Phase 9: Admin foundation
- [ ] Add roles. Write `requireAdmin()` and `requireSuperAdmin()` helpers, and protect everything under `/admin` using both middleware and checks inside each action.
- [ ] Build the admin layout with a sidebar, and create the super admin through the seed script.
- **Done when:** a client gets blocked from `/admin`, and the super admin gets in.

### Phase 10: Admin trips management
- [ ] Build the trips table, a create/edit form (including adding stops, hotels, and nights), delete, and a status dropdown.
- [ ] When the status becomes `FINISHED`, set `finishedAt`.
- **Done when:** you can create a full multi-city trip from the admin page, and it appears on the public home feed.

### Phase 11: Admin bookings
- [ ] Build the bookings table with filter by status and trip.
- [ ] Add status change (`OPEN` / `CONFIRMED` / `CANCELLED`) and delete.
- **Done when:** a status change made by the admin shows on the client's `/my-bookings`.

### Phase 12: Admin messages
- [ ] Build the same table pattern with `OPEN` / `RESOLVED` and delete.
- **Done when:** the admin can resolve a client message.

### Phase 13: Admin clients
- [ ] List clients with their join date and booking count.
- [ ] Add tag buttons (`LOYAL` / `INACTIVE` / none) and a "suggested inactive" badge following the rule in section 6.
- **Done when:** tags are saved and visible.

### Phase 14: Analytics
- [ ] Write a query for city points from finished trips, with a 6-month window selector.
- [ ] Show the result in a big Recharts bar chart.
- **Done when:** marking a seeded trip as finished moves the chart.

### Phase 15: Super admin features
- [ ] Build a page that creates an admin by email, a block/unblock button, and delete.
- [ ] **Blocking** must set `isBlocked = true` and delete the user's sessions. Also check `isBlocked` on login.
- [ ] Allow the super admin to delete client accounts, and decide what happens to their bookings (delete them, or keep them with the user's name stored).
- **Done when:** a blocked admin who is logged in on another browser is kicked out on the next request.

### Phase 16: Admin 2FA (TOTP)
- [ ] On an admin's first login, generate a secret, show a QR code, and verify one code before enabling.
- [ ] On later logins, require the 6-digit code after the email step. Until the code is verified, the session must not grant admin access.
- [ ] Add a way for the super admin to reset an admin's 2FA if they lose their phone.
- **Done when:** an admin can't reach `/admin` with only the email link.

### Phase 17: Security and quality pass
- [ ] Check that every server action validates its input and its role.
- [ ] Add rate limiting on login and forms, and escape or sanitize all user text.
- [ ] Keep secrets in `.env`, and never commit it.
- [ ] Add loading and error states, and test on a real phone.

### Phase 18: Deploy
- [ ] Deploy to Vercel, set the environment variables, and run migrations.
- [ ] Verify the email domain so login emails don't go to spam.
- [ ] Test the full flow in production.

---

## 9. Suggested Order if Time Is Short

If you need something showable fast, finish **Phases 0 to 7** first. That's a working public site plus real booking, which is already a solid portfolio piece. Then do **9 to 11**, and add **12 to 16** afterwards.

---

## 10. Things to Decide Later

- Do trips have a limited number of seats (a number that decreases), or does the admin set `LAST_SEAT` by hand? The current plan is by hand.
- Images: URL links, or uploaded files (Cloudinary or similar)? Start with URLs.
- Languages: French, Arabic, or English? Start with one.

---

## 11. Working Method (per phase)

1. Write the goal in one sentence.
2. Build the smallest version that works.
3. Test it by hand and try to break it.
4. Commit to Git with a clear message.
5. Note anything you didn't understand in a "stuck list" and come back to it.
