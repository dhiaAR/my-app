export const metadata = {
  title: "Contact Us | Parfums de Tunisie",
  description: "Get in touch with Parfums de Tunisie.",
};

const email = "testtesttestesttest@gmail.com";
const phone = "+216 99999999";

const inputClass =
  "w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-900 outline-none transition focus:border-orange-700 focus:ring-2 focus:ring-orange-700/20";

export default function ContactPage() {
  return (
    <main className="mx-auto w-full max-w-5xl space-y-8 px-4 py-10 sm:px-6 lg:px-8">
      <h1 className="text-center text-4xl font-bold text-orange-800 drop-shadow sm:text-5xl">
        Contact Us
      </h1>

      <section className="rounded-2xl bg-white/90 p-6 shadow-lg sm:p-8">
        <h2 className="mb-2 text-2xl font-semibold text-gray-900 sm:text-3xl">
          If you have something to discuss
        </h2>
        <p className="mb-6 text-gray-700">
          Send us your question or report a problem and we&apos;ll be happy to
          help you.
        </p>

        <form className="space-y-5">
          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label
                htmlFor="name"
                className="mb-1 block text-sm font-medium text-gray-800"
              >
                Full Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                autoComplete="name"
                placeholder="Your full name"
                className={inputClass}
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="mb-1 block text-sm font-medium text-gray-800"
              >
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                placeholder="you@example.com"
                className={inputClass}
              />
            </div>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label
                htmlFor="phone"
                className="mb-1 block text-sm font-medium text-gray-800"
              >
                Phone Number{" "}
                <span className="font-normal text-gray-500">(optional)</span>
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                autoComplete="tel"
                placeholder="+216 XX XXX XXX"
                className={inputClass}
              />
            </div>
            <div>
              <label
                htmlFor="type"
                className="mb-1 block text-sm font-medium text-gray-800"
              >
                Type
              </label>
              <select
                id="type"
                name="type"
                defaultValue="question"
                className={inputClass}
              >
                <option value="question">Question</option>
                <option value="problem">Problem report</option>
              </select>
            </div>
          </div>

          <div>
            <label
              htmlFor="message"
              className="mb-1 block text-sm font-medium text-gray-800"
            >
              Message{" "}
              <span className="font-normal text-gray-500">
                (maximum 150 characters)
              </span>
            </label>
            <textarea
              id="message"
              name="message"
              rows={4}
              maxLength={150}
              placeholder="Write your message here..."
              className={`${inputClass} resize-y`}
            />
          </div>

          <button
            type="button"
            className="rounded-lg bg-orange-700 px-5 py-3 font-semibold text-white transition hover:bg-orange-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-800"
          >
            Send
          </button>
        </form>
      </section>

      <section className="rounded-2xl bg-white/90 p-6 shadow-lg sm:p-8">
        <h2 className="mb-2 text-2xl font-semibold text-gray-900 sm:text-3xl">
          Find Us
        </h2>
        <p className="mb-5 text-gray-700">
          Our map currently shows Tunis, Tunisia as a sample location. Please
          confirm the exact address before visiting.
        </p>
        <div className="overflow-hidden rounded-xl">
          <iframe
            title="Map showing the sample location in Tunis, Tunisia"
            src="https://maps.google.com/maps?q=Tunis%2C%20Tunisia&z=12&output=embed"
            className="h-[300px] w-full border-0"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </section>

      <section className="rounded-2xl bg-white/90 p-6 shadow-lg sm:p-8">
        <h2 className="mb-5 text-2xl font-semibold text-gray-900 sm:text-3xl">
          For More Information
        </h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-xl border border-orange-100 bg-orange-50/70 p-5">
            <p className="mb-1 text-sm font-semibold uppercase tracking-wide text-gray-600">
              Email
            </p>
            <a
              href={`mailto:${email}`}
              className="break-all font-semibold text-orange-800 underline-offset-4 hover:underline"
            >
              {email}
            </a>
          </div>
          <div className="rounded-xl border border-orange-100 bg-orange-50/70 p-5">
            <p className="mb-1 text-sm font-semibold uppercase tracking-wide text-gray-600">
              Phone
            </p>
            <a
              href={`tel:${phone.replace(/\s/g, "")}`}
              className="font-semibold text-orange-800 underline-offset-4 hover:underline"
            >
              {phone}
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}