"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  FiArrowRight,
  FiEye,
  FiEyeOff,
  FiLock,
  FiPackage,
  FiShield,
  FiTruck,
} from "react-icons/fi";
import { api } from "../../lib/api";

const highlights = [
  { icon: FiPackage, title: "Catalog control", copy: "Manage products, categories, and subcategory records." },
  { icon: FiTruck, title: "Order-ready data", copy: "Keep gifting ranges aligned with bulk enquiry workflows." },
  { icon: FiShield, title: "Protected access", copy: "Admin sessions are stored locally and checked before dashboard access." },
];

export default function LoginPage() {
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (window.localStorage.getItem("printkee-admin-token")) {
      router.replace("/admin");
    }
  }, [router]);

  const updateField = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await api.post("/admin/login", form);
      const token = response.data.token;

      window.localStorage.setItem("printkee-admin-token", token);
      window.localStorage.setItem("adminToken", token);
      router.push("/admin");
    } catch (err) {
      console.error(err);
      setError("Invalid email or password. Please check your PrintKee admin credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="auth-page">
      <section className="auth-layout container">
        <div className="auth-brand-panel">
          <div className="auth-brand-panel__logo">
            <img src="/assets/printkeeLogo.webp" alt="PrintKee" />
          </div>
          <p className="auth-kicker">PrintKee Admin</p>
          <h1>Manage corporate gifting content with confidence.</h1>
          <p>
            Sign in to update product ranges, category records, custom gifting
            content, and catalog information used across the PrintKee Next app
          </p>

          <div className="auth-highlight-grid">
            {highlights.map((item) => {
              const Icon = item.icon;
              return (
                <article key={item.title}>
                  <Icon aria-hidden="true" />
                  <div>
                    <strong>{item.title}</strong>
                    <span>{item.copy}</span>
                  </div>
                </article>
              );
            })}
          </div>
        </div>

        <div className="auth-card">
          <div className="auth-card__icon">
            <FiLock aria-hidden="true" />
          </div>
          <p className="auth-kicker">Secure sign in</p>
          <h2>Access dashboard</h2>
          <p className="auth-card__copy">
            Use your PrintKee administrator credentials to continue.
          </p>

          {error && <p className="auth-alert auth-alert--error">{error}</p>}

          <form onSubmit={handleSubmit} className="auth-form">
            <label>
              Email address
              <input
                name="email"
                type="email"
                value={form.email}
                onChange={updateField}
                autoComplete="email"
                placeholder="admin@printkee.com"
                required
              />
            </label>

            <label>
              Password
              <span className="auth-password-field">
                <input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={form.password}
                  onChange={updateField}
                  autoComplete="current-password"
                  placeholder="Enter password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((current) => !current)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <FiEyeOff aria-hidden="true" /> : <FiEye aria-hidden="true" />}
                </button>
              </span>
            </label>

            <button type="submit" className="auth-submit" disabled={loading}>
              {loading ? "Signing in..." : "Sign in to dashboard"}
              <FiArrowRight aria-hidden="true" />
            </button>
          </form>

          <div className="auth-card__footer">
            <Link href="/" className="auth-card__back-home">
              Back to Home
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
