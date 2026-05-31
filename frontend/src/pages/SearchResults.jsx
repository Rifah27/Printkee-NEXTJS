import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import { Helmet } from "react-helmet";
import "../styles/SearchResults.css";
import WhyChooseUs from "../components/WhyChooseUs";

const SearchResults = () => {
  const { search } = useLocation();
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);

  const queryParams = new URLSearchParams(search);
  const query = queryParams.get("q");
  const category = queryParams.get("cat");

  const slugify = (text) =>
    text
      .toLowerCase()
      .trim()
      .replace(/&/g, "and")
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/--+/g, "-");

  useEffect(() => {
    const fetchResults = async () => {
      setLoading(true);
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/search?q=${query}&cat=${category}`
        );
        setResults(res.data);
      } catch (err) {
        console.error(err);
        setResults([]);
      } finally {
        setLoading(false);
      }
    };

    if (query) fetchResults();
  }, [query, category]);

  const canonicalUrl = `https://printkee.com/search?q=${encodeURIComponent(
    query || ""
  )}&cat=${encodeURIComponent(category || "")}`;

  return (
    <>
      <div className="search-page">
        <Helmet>
          <title>
            {query
              ? `Search Results for "${query}" | MF Global Services`
              : "Search | MF Global Services"}
          </title>

          <meta
            name="description"
            content={
              query
                ? `Explore products matching "${query}"${
                    category && category !== "All Categories"
                      ? ` in ${category}`
                      : ""
                  }. Corporate gifting made easy with MF Global Services.`
                : "Search across corporate gifting products, branded items, hampers, and custom merchandise."
            }
          />

          <meta
            name="keywords"
            content="search corporate gifts, branded gifts, corporate gifting India, Printkee search results"
          />

          <link rel="canonical" href={canonicalUrl} />

          {/* OpenGraph */}
          <meta property="og:title" content={`Search: ${query}`} />
          <meta
            property="og:description"
            content={`Search results for ${query} at MF Global Services.`}
          />
          <meta property="og:url" content={canonicalUrl} />
          <meta property="og:type" content="website" />
        </Helmet>

        <div className="search-page__container">
          <h2 className="search-page__heading" aria-live="polite">
            {query ? (
              <>
                Search Results for:{" "}
                <span className="search-page__query">"{query}"</span>{" "}
                {category && category !== "All Categories" && (
                  <span className="search-page__category">in {category}</span>
                )}
              </>
            ) : (
              "Search"
            )}
          </h2>

          {loading ? (
            <div className="search-page__grid">
              {[...Array(6)].map((_, idx) => (
                <div
                  key={idx}
                  className="search-page__card search-page__card--loading"
                  role="status"
                  aria-label="Loading search result"
                >
                  <div className="search-page__image skeleton" />
                  <div className="search-page__card-content">
                    <div className="skeleton skeleton-title" />
                    <div className="skeleton skeleton-text" />
                  </div>
                </div>
              ))}
            </div>
          ) : results.length === 0 ? (
            <p className="search-page__no-results" role="alert">
              No results found.
            </p>
          ) : (
            <section
              className="search-page__grid"
              aria-label="Search results listing"
            >
              {results.map((item, idx) => (
                <Link
                  key={idx}
                  to={`/${slugify(item.category)}/${slugify(item.subcategory)}/${slugify(item.name)}`}
                  className="search-page__card-link"
                  aria-label={`View details for ${item.name}`}
                >
                  <div className="search-page__card">
                    <img
                      src={item.image}
                      alt={`${item.name} - corporate gifting product`}
                      className="search-page__image"
                    />
                    <div className="search-page__card-content">
                      <h3 className="search-page__title">{item.name}</h3>
                      <p className="search-page__description">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </section>
          )}
        </div>
      </div>
      <WhyChooseUs />
    </>
  );
};

export default SearchResults;
