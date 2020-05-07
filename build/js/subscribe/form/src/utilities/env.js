const env = sub => {
  const url = window.location.hostname;
  const end = sub === "patron" ? "patrons" : "subscribers";
  const pkey =
    url === "stingingfly.org"
      ? "pk_live_EPVd6u1amDegfDhpvbp57swa"
      : "pk_test_0lhyoG9gxOmK5V15FobQbpUs";
  const endpoint =
    url === "stingingfly.org"
      ? `https://enigmatic-basin-09064.herokuapp.com/api/${end}`
      : `http://localhost:8001/api/${end}`;
  return {
    url: url,
    pkey: pkey,
    endpoint: endpoint
  };
};

export default env;
