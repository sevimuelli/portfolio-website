import React from 'react';
import { Link } from 'gatsby';
import { BlockContent } from '@components';
import styled from 'styled-components';
import { theme, mixins, media } from '@styles';
import Slider from 'react-slick';
import { IconGitHub, IconExternal } from '@components/icons';
import { imageUrlFor } from '../utils/image-url';
import { buildImageObj } from '../utils/helpers';

const { colors, fontSizes } = theme;

const StyledPostHeader = styled.header`
  margin-bottom: 50px;

  .tag {
    margin-right: 10px;
  }
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

const StyledFigure = styled.figure`
  position: relative;
  margin: 0;
  width: 100%;
  background: #000;
  background-size: cover;
  background-repeat: no-repeat;
`;

const StyledFigureImage = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  transition: opacity 1s ease-in;
  border-bottom: solid 1px ${colors.navy};
`;

const StyledImgOverlay = styled.div`
  position: absolute;
  text-transform: uppercase;
  font-weight: bold;
  font-size: ${fontSizes.md};
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;

  ${media.tablet`
    font-size: ${fontSizes.xs}
  `}
`;

const StyledImgCaption = styled.div`
  padding: 2px;
`;

const slickSettings = {
  dots: true,
  infinite: true,
  speed: 1000,
  slidesToShow: 1,
  slidesToScroll: 1,
  initialSlide: 0,
  fade: true,
  autoplay: true,
  autoplaySpeed: 3500,
  cssEase: 'linear',
  pauseOnHover: true,
};

function Project({ data }) {
  const {
    aspectRatioImgGal,
    _rawBody,
    _rawIntroText,
    title,
    publishedAt,
    relatedProjects,
    imgGallery,
    tags,
    githubLink,
    externalLink,
  } = data;

  // Sort image gallery  in corespondace to its order
  imgGallery.sort((a, b) => parseInt(a.order, 10) - parseInt(b.order, 10));

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
              day: 'numeric',
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
        {_rawIntroText && <BlockContent blocks={_rawIntroText || []} />}
        <StyledCaruselContainer>
          <Slider {...slickSettings} arrows>
            {imgGallery.length > 0 &&
              imgGallery.map((img, i) => (
                <div>
                  <StyledFigure
                    style={{
                      backgroundImage: `url(${img.asset.metadata.lqip})`,
                      paddingTop: `calc(100% * ${aspectRatioImgGal})`,
                    }}
                  >
                    <StyledFigureImage
                      key={i}
                      src={imageUrlFor(buildImageObj(img))
                        .width(800)
                        .height(Math.floor(aspectRatioImgGal * 800))
                        .url()}
                      alt={img.alt}
                    />
                  </StyledFigure>
                  <StyledImgOverlay>
                    <StyledImgCaption
                      style={{
                        backgroundColor: img.asset.metadata.palette.vibrant.background,
                        color: img.asset.metadata.palette.vibrant.foreground,
                      }}
                    >
                      {img.caption}
                    </StyledImgCaption>
                  </StyledImgOverlay>
                </div>
              ))}
          </Slider>
        </StyledCaruselContainer>
        {_rawBody && <BlockContent blocks={_rawBody || []} />}
      </StyledPostContent>
    </div>
  );
}

export default Project;
