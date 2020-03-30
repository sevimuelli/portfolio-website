import { format, distanceInWords, differenceInDays } from 'date-fns';
import React from 'react';
import { Link } from 'gatsby';
import { buildImageObj } from '../lib/helpers';
import { imageUrlFor } from '../lib/image-url';
import BlockContent from './block-content';
import Container from './container';
import RoleList from './role-list';

import styles from './project.module.css';

import styled from 'styled-components';
import { Main, theme, mixins } from '@styles';
const { colors, fontSizes, fonts } = theme;
import Slider from 'react-slick';

const StyledPostContainer = styled(Main)`
  max-width: 1000px;
`;
const StyledPostHeader = styled.header`
  margin-bottom: 50px;
  .tag {
    margin-right: 10px;
  }
`;

const StyledRelatedProjects = styled.div`
  margin: 35px 0px;
  font-size: ${fontSizes.xxxl};
`;

const StyledRelatedProjectLink = styled(Link)`
  margin-left: 20px;
`;

const StyledPostContent = styled.div`
  margin-bottom: 100px;
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    margin: 2em 0 1em;
  }

  p {
    margin: 1em 0;
    line-height: 1.5;
    color: ${colors.lightSlate};
  }
`;

const StyledCaruselContainer = styled.div``;

const StyledCaruselImgContainter = styled.div`
`;

const slickSettings = {
  // className: 'center',
  // centerMode: true,
  // centerPadding: '100px',
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  initialSlide: 0,
  responsive: [
    {
      breakpoint: 700,
      settings: {
        slidesToShow: 1,
        // className: '',
        // centerMode: false,
        // centerPadding: '0px'
      }
    }
  ]
};

function Project({ data }) {
  const {
    _rawBody,
    _rawIntroText,
    title,
    mainImage,
    publishedAt,
    relatedProjects,
    tech,
    imgGallery
  } = data;
  return (
    <div>
      <span className="breadcrumb">
        <span className="arrow">&larr;</span>
        <Link to="/archive">Back to archive</Link>
      </span>
      <StyledPostHeader>
        <h1 className="medium-title">{title}</h1>
        <p className="subtitle">
          <time>
            {new Date(publishedAt).toLocaleDateString('en-GB', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </time>
          <span>&nbsp;&mdash;&nbsp;</span>
          {tech &&
            tech.length > 0 &&
            tech.map((tech, i) => (
              <Link key={i} to={'#'} className="tag">
                #{tech}
              </Link>
            ))}
        </p>
        {relatedProjects && (
          <StyledRelatedProjects>
            <strong>Related Projects: </strong>
            {relatedProjects.map((project, i) => (
              <StyledRelatedProjectLink key={i} to={`/project/${project.slug.current}`}>
                {project.title}
              </StyledRelatedProjectLink>
            ))}
          </StyledRelatedProjects>
        )}
      </StyledPostHeader>
      <StyledPostContent>
        {/* <img
          src={imageUrlFor(buildImageObj(imgGallery[0]))
            .width(600)
            .height(Math.floor((9 / 16) * 600))
            .url()}
          alt={imgGallery[0].alt}
        /> */}
        {_rawIntroText && <BlockContent blocks={_rawIntroText || []} />}
        <StyledCaruselContainer>
          <Slider {...slickSettings} arrows>
            {imgGallery.map((img, i) => (
              <StyledCaruselImgContainter>
                <img
                  key={i}
                  src={imageUrlFor(buildImageObj(img))
                    .width(600)
                    .height(Math.floor((9 / 16) * 600))
                    .url()}
                  alt={img.alt}
                />
              </StyledCaruselImgContainter>
            ))}
          </Slider>
        </StyledCaruselContainer>
        {_rawBody && <BlockContent blocks={_rawBody || []} />}
      </StyledPostContent>
    </div>
  );
}

export default Project;

{
  /* <article className={styles.root}>
  {mainImage && mainImage.asset && (
    <div className={styles.mainImage}>
      <img
        src={imageUrlFor(buildImageObj(mainImage))
          .width(1200)
          .height(Math.floor((9 / 16) * 1200))
          .fit('crop')
          .url()}
        alt={mainImage.alt}
      />
    </div>
  )}
  <Container>
    <div className={styles.grid}>
      <div className={styles.mainContent}>
        <h1 className={styles.title}>{title}</h1>
        {_rawBody && <BlockContent blocks={_rawBody || []} />}
      </div>
      <aside className={styles.metaContent}>
        {publishedAt && (
          <div className={styles.publishedAt}>
            {differenceInDays(new Date(publishedAt), new Date()) > 3
              ? distanceInWords(new Date(publishedAt), new Date())
              : format(new Date(publishedAt), 'MMMM Do YYYY')}
          </div>
        )}
        {members && members.length > 0 && <RoleList items={members} title="Project members" />}
        {categories && categories.length > 0 && (
          <div className={styles.categories}>
            <h3 className={styles.categoriesHeadline}>Categories</h3>
            <ul>
              {categories.map(category => (
                <li key={category._id}>{category.title}</li>
              ))}
            </ul>
          </div>
        )}
        {relatedProjects && relatedProjects.length > 0 && (
          <div className={styles.relatedProjects}>
            <h3 className={styles.relatedProjectsHeadline}>Related projects</h3>
            <ul>
              {relatedProjects.map(project => (
                <li key={`related_${project._id}`}>
                  {project.slug ? (
                    <Link to={`/project/${project.slug.current}`}>{project.title}</Link>
                  ) : (
                    <span>{project.title}</span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        )}
      </aside>
    </div>
  </Container>
</article>; */
}
