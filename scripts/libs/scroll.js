class ScrollObserver{

    constructor(els, cb, options){
        this.els = document.querySelectorAll(els);
        this.cb = cb;
        this._init();
        const defaultOptions = {
            root:null,
            rootMargin: "0px",
            threshold:0,
            once: true
        }
        console.log(defaultOptions.once)
        this.options =  Object.assign(defaultOptions, options);
        this.once = this.options.once;
    
    }

    _init(){

        const cb= function (entries, observer) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    console.log(entry);
                    console.log(this);
                    this.cb(entry.target,true)
                    if(this.once){
                        observer.unobserve(entry.target);
                    }                    
                } else {
                    this.cb(entry.target,false)
                }
            });
        };

        const io = new IntersectionObserver(cb.bind(this), this.options);
        this.els.forEach(el => io.observe(el));

    }
}