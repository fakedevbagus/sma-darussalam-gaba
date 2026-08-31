"use client";

/** Jaring pengaman terakhir — error di root layout (html/body gagal render) */
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="id">
      <body style={{ fontFamily: "system-ui, sans-serif", background: "#f6f8fe", display: "flex", alignItems: "center", justifyContent: "center", minHeight: "100vh", margin: 0 }}>
        <div style={{ textAlign: "center", padding: "2rem", maxWidth: 480 }}>
          <div style={{ fontSize: 48 }}>⚠️</div>
          <h1 style={{ color: "#141a5e", fontSize: 24, margin: "12px 0 8px" }}>Terjadi Kesalahan</h1>
          <p style={{ color: "#475569", fontSize: 14, lineHeight: 1.6 }}>
            Website SMA Darussalam mengalami gangguan sementara. Silakan coba lagi.
          </p>
          {error.digest && (
            <p style={{ color: "#94a3b8", fontSize: 11, fontFamily: "monospace" }}>Kode: {error.digest}</p>
          )}
          <button
            onClick={reset}
            style={{ marginTop: 20, background: "#141a5e", color: "#fff", border: "none", borderRadius: 999, padding: "12px 28px", fontSize: 14, fontWeight: 700, cursor: "pointer" }}
          >
            Coba Lagi
          </button>
        </div>
      </body>
    </html>
  );
}