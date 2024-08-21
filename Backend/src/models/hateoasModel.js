const hateoasURL = (data, totalResult, page) => {
  const total = parseInt(totalResult.total);
  const results = data.map((element) => {
    return {
      id: element.id,
      longurl: element.longurl,
      shorturl: element.shorturl,
      user_id: element.user_id,
      createdat: element.createdat,
      title: element.title,
    };
  });
  const totalPerPage = results.length;
  const HATEOAS = {
    total,
    results,
    totalPerPage,
    page,
  };
  return HATEOAS;
};
export const HATEOASmodel = {
  hateoasURL,
};
