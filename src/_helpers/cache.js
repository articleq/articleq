const imgCache = {
    __cache: {},
    read(src) {
    if (!this.__cache[src]) {
        this.__cache[src] = new Promise((resolve) => {
        const img = new Image();
        img.onload = () => {
            this.__cache[src] = true;
            resolve(this.__cache[src]);
        };
        img.src = src;
        }).then((img) => {
            this.__cache[src] = true;
        });
    }
    // if (this.__cache[src] instanceof Promise) {
    //   throw this.__cache[src];
    // }
    return this.__cache[src];
    }
};
  
//Not used yet! Use later for background images or anything else that needs to be cached.
export const loadCache = (images) => {
    images.forEach((img) => imgCache.read(img));
    return true;
}