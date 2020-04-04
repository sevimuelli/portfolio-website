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
import { Main, theme, mixins, media } from '@styles';
const { colors, fontSizes, fonts } = theme;
import Slider from 'react-slick';
import { IconGitHub, IconExternal } from '@components/icons';

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
  color: ${colors.lightSlate};
`;

const StyledRelatedProjectLink = styled(Link)`
  ${mixins.inlineLink};
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

const StyledCaruselContainer = styled.div`
  margin-top: 50px;
  margin-bottom: 30px;
  .slick-dots li button::before {
    color: ${colors.green};
  }

  .slick-dots li.slick-active button::before {
    color: ${colors.green};
  }

  .slick-prev::before,
  .slick-next::before {
    color: ${colors.lightSlate};
  }
`;

const StyledCaruselImgContainter = styled.div`
  ${'' /* padding-right: 20px;
  padding-left: 20px; */}
`;

const StyledImgOverlay = styled.div`
  position: absolute;
  padding: 15px;
  text-transform: uppercase;
  font-weight: bold;
  font-size: ${fontSizes.xxl};
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  display: flex;
  align-items: flex-start;
  justify-content: flex-end;

  ${media.tablet`
    padding: 10px;
    font-size: ${fontSizes.lg}
  `}
`;

const StyledImgCaption = styled.div`
  padding: 5px;
`;

const StyledLinkWrapper = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  margin-top: 10px;
  margin-left: -10px;
  color: ${colors.lightestSlate};
  a {
    padding: 10px;
    svg {
      width: 22px;
      height: 22px;
    }
  }
`;

const slickSettings = {
  // className: 'center',
  // centerMode: true,
  // centerPadding: '100px',
  dots: true,
  infinite: true,
  speed: 1000,
  slidesToShow: 1,
  slidesToScroll: 1,
  initialSlide: 0,
  fade: true,
  autoplay: false,
  autoplaySpeed: 3500,
  cssEase: 'linear',
  pauseOnHover: true
  // responsive: [
  //   {
  //     breakpoint: 700,
  //     settings: {
  //       slidesToShow: 1
  //       // className: '',
  //       // centerMode: false,
  //       // centerPadding: '0px'
  //     }
  //   }
  // ]
};

function Project({ data }) {
  const {
    aspectRatioImgGal,
    _rawBody,
    _rawIntroText,
    title,
    mainImage,
    publishedAt,
    relatedProjects,
    tech,
    imgGallery,
    tags,
    githubLink,
    externalLink
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
          {tags &&
            tags.length > 0 &&
            tags.map((tag, i) => (
              <Link key={i} to={`/tags/${tag.slug.current}`} className="tag">
                #{tag.title}
              </Link>
            ))}
        </p>
        <StyledLinkWrapper>
          {githubLink && (
            <a
              href={githubLink}
              target="_blank"
              rel="nofollow noopener noreferrer"
              aria-label="GitHub Link"
            >
              <IconGitHub />
            </a>
          )}
          {externalLink && (
            <a
              href={externalLink}
              target="_blank"
              rel="nofollow noopener noreferrer"
              aria-label="External Link"
            >
              <IconExternal />
            </a>
          )}
        </StyledLinkWrapper>
        {relatedProjects.length > 0 && (
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
            {mainImage && (
              <StyledCaruselImgContainter>
                <img
                  src={imageUrlFor(buildImageObj(mainImage))
                    .width(600)
                    .height(Math.floor(aspectRatioImgGal * 600))
                    .url()}
                  alt={mainImage.alt}
                />
                <StyledImgOverlay>
                  <StyledImgCaption
                    style={{
                      backgroundColor: mainImage.asset.metadata.palette.vibrant.background,
                      color: mainImage.asset.metadata.palette.vibrant.foreground
                    }}
                  >
                    {mainImage.caption}
                  </StyledImgCaption>
                </StyledImgOverlay>
              </StyledCaruselImgContainter>
            )}
            {imgGallery.length > 0 &&
              imgGallery.map((img, i) => (
                <StyledCaruselImgContainter>
                  <img
                    key={i}
                    src={imageUrlFor(buildImageObj(img))
                      .width(600)
                      .height(Math.floor(aspectRatioImgGal * 600))
                      .url()}
                    alt={img.alt}
                  />
                  <StyledImgOverlay>
                    <StyledImgCaption
                      style={{
                        backgroundColor: img.asset.metadata.palette.vibrant.background,
                        color: img.asset.metadata.palette.vibrant.foreground
                      }}
                    >
                      {img.caption}
                    </StyledImgCaption>
                  </StyledImgOverlay>
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
