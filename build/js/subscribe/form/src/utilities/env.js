const env = () => {
  const url = window.location.hostname;
  const pkey =
    url === "stingingfly.org"
      ? "pk_live_EPVd6u1amDegfDhpvbp57swa"
      : "pk_test_0lhyoG9gxOmK5V15FobQbpUs";
  const endpoint =
    url === "stingingfly.org"
      ? "https://stingingfly.org/stripe/api/index.php"
      : "http://localhost:8001/api/subscribers";
  return {
    url: url,
    pkey: pkey,
    endpoint: endpoint
  };
};

export default env;
