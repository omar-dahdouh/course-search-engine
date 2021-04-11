class MaxHeap {
    constructor() {
        this.size = 0;
        this.prior = [];
        this.value = [];
    }

    getSize() {
        return this.size;
    }

    peek() {
        return this.value[0];
    }

    isEmpty() {
        return this.size === 0;
    }

    push(val, pri) {
        let node = this.size++;
        let par = (node-1)>>1;
        while (node>0 && pri>this.prior[par]) {
            this.value[node] = this.value[par];
            this.prior[node] = this.prior[par];
            node = par;  par = (par-1)>>1;
        }
        this.value[node] = val;
        this.prior[node] = pri;
    }

    pop() {
        if (this.size===0) return null;
        const ppd = this.value[0];
        const val = this.value[this.size-1];
        const pri = this.prior[--this.size];

        let node=0, lft=1, rit=2, sml;
        while (lft<this.size) {
            sml = (rit<this.size && this.prior[rit]>this.prior[lft]) ? rit : lft;
            if (pri >= this.prior[sml]) break;
            this.value[node] = this.value[sml];
            this.prior[node] = this.prior[sml];
            node=sml; lft=(sml<<1)+1; rit=lft+1;
        }
        this.value[node] = val;
        this.prior[node] = pri;
        return ppd;
    }
}

module.exports = MaxHeap;
