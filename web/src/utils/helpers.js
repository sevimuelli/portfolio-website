export function mapEdgesToNodes(data) {
    if (!data.edges) return [];
    return data.edges.map((edge) => edge.node);
}

export function buildImageObj(source) {
    const imageObj = {
        // eslint-disable-next-line no-underscore-dangle
        asset: { _ref: source.asset._ref || source.asset._id },
    };

    if (source.crop) imageObj.crop = source.crop;
    if (source.hotspot) imageObj.hotspot = source.hotspot;

    return imageObj;
}

export function throttle(func, wait = 100) {
    let timer = null;
    return (...args) => {
        if (timer === null) {
            timer = setTimeout(() => {
                func.apply(this, args);
                timer = null;
            }, wait);
        }
    };
}
