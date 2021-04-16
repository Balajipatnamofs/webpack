/**
 * Function representing a meta tags
 * @CreatedOn 25/11/2019
 * @version 1.0
 * @author [ofs-UI Team]
 * @extends Component
 */

import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";

const MetaTags = (props) => {
  let [content, setContent] = useState({
    title: "Digital Product Development Company",
    description:
      "ObjectFrontier Software(OFS) is a leading outsourcing software development company focusing on offshore product development services, custom software development, banking solutions and mobile apps with its strong technical team on worldwide.",
    thumbnail: "https://i.ytimg.com/vi/6hkamvjtbG4/maxresdefault.jpg",
    keywords:
      "software development services outsourcing software development, offshore software development, application development outsourcing, Outsourcing Development, Outsourcing Software Development, Outsourcing Development Software, Software Development Company, Software Outsourcing, Offshore Software Development, Software Application Development, Custom Software Development, Outsourced Development"
  });

  useEffect(() => {
    let updatedContent = {};
    updatedContent.title = props.title || content.title;
    updatedContent.description = props.description || content.description;
    updatedContent.thumbnail = props.thumbnail || content.thumbnail;
    updatedContent.url = props.url;
    updatedContent.keywords = props.keywords || content.keywords;
    setContent(updatedContent);
  }, [props.title]);

  let { title, description, thumbnail, keywords } = content;
  return (
    <>
      <Helmet>
        {/* Default Meta Tags */}
        <title>ObjectFrontier - {title} </title>
        {/** Story Image*/}
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        {/* Facebook related Meta Tags */}
        <meta property="og:url" content={props.url} />
        <meta property="og:type" content="article" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        {/* Max 2 to 4 sentenses */}
        <meta property="og:image" content={thumbnail} />
        {/* Min Size 600x315  Max Size 1200x630, Max 5MB */}
        <meta property="og:site_name" content="European Travel, Inc." />{" "}
        {/** Optional */}
        {/* Twitter related Meta Tags */}
        <meta name="twitter:title" content={title} /> {/* Max 70 char */}
        <meta name="twitter:description" content={description} />{" "}
        {/* Max 200 char */}
        <meta name="twitter:image" content={thumbnail} />
        {/* Min Size 280x150  Max Size 1200x630, Max 5MB */}
        <meta name="twitter:card" content="summary_large_image" />
        {/** For now use same image */}
        <meta name="twitter:image:alt" content="Alt text for image" />
        {/** Optional */}
      </Helmet>
    </>
  );
};

export { MetaTags };
