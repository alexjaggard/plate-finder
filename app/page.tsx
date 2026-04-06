// forcerebuild 123
"use client";

import { useState, useEffect } from "react";

export default function Home() {
  const [search, setSearch] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (search.length === 0) {
      setResults([]);
      return;
    }

    setLoading(true);

    const delay = setTimeout(async () => {
      const res = await fetch(`/api/search?q=${search}`);
      const data = await res.json();

      setResults(data);
      setLoading(false);
    }, 400);

    return () => clearTimeout(delay);
  }, [search]);

  const highlightMatch = (plate: string) => {
    if (!search) return plate;

    const parts = plate.split(new RegExp(`(${search})`, "gi"));

    return parts.map((part, i) =>
      part.toLowerCase() === search.toLowerCase() ? (
        <span key={i} style={{ color: "red" }}>{part}</span>
      ) : (
        <span key={i}>{part}</span>
      )
    );
  };

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#0d0d0d",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        paddingTop: 100,
        fontFamily: "Arial, sans-serif",
      }}
    >
      {/* Title */}
      <h1
        style={{
          color: "#FFD700",
          fontSize: 48,
          fontWeight: "bold",
          textShadow: "0 0 15px rgba(255,215,0,0.6)",
        }}
      >
        PlateFinder
      </h1>

      <p
        style={{
          color: "#aaa",
          marginTop: 10,
          fontSize: 18,
        }}
      >
        Find your perfect private number plate
      </p>

      {/* Search */}
      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search plates (e.g. TOM, S4M)"
        style={{
          marginTop: 40,
          width: 400,
          padding: 16,
          fontSize: 20,
          borderRadius: 8,
          border: "1px solid #333",
          background: "#1a1a1a",
          color: "white",
          textAlign: "center",
          outline: "none",
        }}
      />

      {/* Loading */}
      {loading && (
        <div style={{ marginTop: 15, color: "#888" }}>
          Searching...
        </div>
      )}

      {/* No results */}
      {!loading && results.length === 0 && search.length > 0 && (
        <div style={{ marginTop: 15, color: "#ff9800" }}>
          No plates found
        </div>
      )}

      {/* Popular Plates */}
      {search.length === 0 && (
        <div style={{ marginTop: 50, textAlign: "center" }}>
          <h3 style={{ color: "#aaa" }}>Popular Plates</h3>
          <div style={{ marginTop: 10, color: "#FFD700" }}>
            AB24 TOM • S4M • M4TT • J4MES
          </div>
        </div>
      )}

      {/* Results */}
      <div
        style={{
          marginTop: 50,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 20,
        }}
      >
        {results.map((plate) => (
          <div
            key={plate.id}
            style={{
              background: "#FFD800",
              color: "black",
              padding: "18px 40px",
              fontSize: 32,
              fontWeight: "bold",
              letterSpacing: 4,
              border: "4px solid black",
              borderRadius: 8,
              boxShadow: "0 0 20px rgba(255,215,0,0.4)",
              minWidth: 260,
              textAlign: "center",
            }}
          >
            {highlightMatch(plate.plate)}

            <div style={{ marginTop: 10, fontSize: 16 }}>
              £2,495
            </div>

            <button
              style={{
                marginTop: 10,
                padding: "8px 16px",
                cursor: "pointer",
                borderRadius: 4,
                border: "none",
              }}
            >
              View Plate
            </button>
          </div>
        ))}
      </div>
    </main>
  );
}``