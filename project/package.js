class Vector {
    constructor(...vals) {
        this.vals = vals;
    }
    map(callback) {
        for (var i = 0; i < this.vals.length; i++) {
            callback(this.vals, i);
        }
        return this;
    }
    mul(v) {
        return this.map((arr, i) => arr[i] *= v.vals[i]);
    }
    div(v) {
        return this.map((arr, i) => arr[i] /= v.vals[i]);
    }
    floor() {
        return this.map((arr, i) => arr[i] = Math.floor(arr[i]));
    }
    ceil() {
        return this.map((arr, i) => arr[i] = Math.ceil(arr[i]));
    }
    round() {
        return this.map((arr, i) => arr[i] = round(arr[i], 10));
    }
    add(v) {
        return this.map((arr, i) => arr[i] += v.vals[i]);
    }
    sub(v) {
        return this.map((arr, i) => arr[i] -= v.vals[i]);
    }
    scale(s) {
        return this.map((arr, i) => arr[i] *= s);
    }
    length() {
        var sum = 0;
        this.map((arr, i) => sum += arr[i] * arr[i]);
        return Math.pow(sum, 0.5);
    }
    setMagnitude(size) {
        return this.normalize().scale(size);
    }
    normalize() {
        return this.scale(1 / this.length());
    }
    to(v) {
        return v.c().sub(this);
    }
    lerp(v, weight) {
        return this.c().add(this.to(v).scale(weight));
    }
    c() {
        return Vector.fromArray(this.vals.slice());
    }
    overwrite(v) {
        return this.map((arr, i) => arr[i] = v.vals[i]);
    }
    dot(v) {
        var sum = 0;
        this.map((arr, i) => sum += arr[i] * v.vals[i]);
        return sum;
    }
    loop(callback) {
        var counter = this.c();
        counter.vals.fill(0);
        while (counter.compare(this) == -1) {
            callback(counter);
            if (counter.incr(this)) {
                break;
            }
        }
    }
    compare(v) {
        for (var i = this.vals.length - 1; i >= 0; i--) {
            if (this.vals[i] < v.vals[i]) {
                continue;
            }
            else if (this.vals[i] == v.vals[i]) {
                return 0;
            }
            else {
                return 1;
            }
        }
        return -1;
    }
    equals(v) {
        for (var i = 0; i < this.vals.length; i++) {
            if (this.vals[i] != v.vals[i]) {
                return false;
            }
        }
        return true;
    }
    incr(comparedTo) {
        for (var i = 0; i < this.vals.length; i++) {
            if ((this.vals[i] + 1) < comparedTo.vals[i]) {
                this.vals[i]++;
                return false;
            }
            else {
                this.vals[i] = 0;
            }
        }
        return true;
    }
    project(v) {
        return v.c().scale(this.dot(v) / v.dot(v));
    }
    get(i) {
        return this.vals[i];
    }
    set(i, val) {
        this.vals[i] = val;
    }
    get x() {
        return this.vals[0];
    }
    get y() {
        return this.vals[1];
    }
    get z() {
        return this.vals[2];
    }
    set x(val) {
        this.vals[0] = val;
    }
    set y(val) {
        this.vals[1] = val;
    }
    set z(val) {
        this.vals[2] = val;
    }
    draw(ctxt) {
        var width = 10;
        var halfwidth = width / 2;
        ctxt.fillRect(this.x - halfwidth, this.y - halfwidth, width, width);
    }
    cross(v) {
        var x = this.y * v.z - this.z * v.y;
        var y = this.z * v.x - this.x * v.z;
        var z = this.x * v.y - this.y * v.x;
        return new Vector(x, y, z);
    }
    static fromArray(vals) {
        var x = new Vector();
        x.vals = vals;
        return x;
    }
    loop2d(callback) {
        var counter = new Vector(0, 0);
        for (counter.x = 0; counter.x < this.x; counter.x++) {
            for (counter.y = 0; counter.y < this.y; counter.y++) {
                callback(counter);
            }
        }
    }
    loop3d(callback) {
        var counter = new Vector(0, 0, 0);
        for (counter.x = 0; counter.x < this.x; counter.x++) {
            for (counter.y = 0; counter.y < this.y; counter.y++) {
                for (counter.z = 0; counter.z < this.z; counter.z++) {
                    callback(counter);
                }
            }
        }
    }
}
// (window as any).devtoolsFormatters = [
//     {
//         header: function(obj, config){
//             if(!(obj instanceof Vector)){
//                 return null
//             }
//             if((obj.vals.length == 2)){
//                 return ["div",{style:""}, `x:${obj.x} y:${obj.y}`]
//             }
//             if((obj.vals.length == 3)){
//                 return ["div",{style:""}, `x:${obj.x} y:${obj.y} z:${obj.z}`]
//             }
//         },
//         hasBody: function(obj){
//             return false
//         },
//     }
// ]
class RNG {
    constructor(seed) {
        this.seed = seed;
        this.mod = 4294967296;
        this.multiplier = 1664525;
        this.increment = 1013904223;
    }
    next() {
        this.seed = (this.multiplier * this.seed + this.increment) % this.mod;
        return this.seed;
    }
    norm() {
        return this.next() / this.mod;
    }
    range(min, max) {
        return this.norm() * to(min, max) + min;
    }
}
class Store {
    constructor() {
        this.map = new Map();
        this.counter = 0;
    }
    get(id) {
        return this.map.get(id);
    }
    add(item) {
        item.id = this.counter++;
        this.map.set(item.id, item);
    }
    list() {
        return Array.from(this.map.values());
    }
    remove(id) {
        var val = this.map.get(id);
        this.map.delete(id);
        return val;
    }
}
var TAU = Math.PI * 2;
function map(val, from1, from2, to1, to2) {
    return lerp(to1, to2, inverseLerp(val, from1, from2));
}
function inverseLerp(val, a, b) {
    return to(a, val) / to(a, b);
}
function inRange(min, max, value) {
    if (min > max) {
        var temp = min;
        min = max;
        max = temp;
    }
    return value <= max && value >= min;
}
function min(a, b) {
    if (a < b)
        return a;
    return b;
}
function max(a, b) {
    if (a > b)
        return a;
    return b;
}
function clamp(val, min, max) {
    return this.max(this.min(val, max), min);
}
function rangeContain(a1, a2, b1, b2) {
    return max(a1, a2) >= max(b1, b2) && min(a1, a2) <= max(b1, b2);
}
function startMouseListen(localcanvas) {
    var mousepos = new Vector(0, 0);
    document.addEventListener('mousemove', (e) => {
        mousepos.overwrite(getMousePos(localcanvas, e));
    });
    return mousepos;
}
function getMousePos(canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    return new Vector(evt.clientX - rect.left, evt.clientY - rect.top);
}
function createCanvas(x, y) {
    var canvas = document.createElement('canvas');
    canvas.width = x;
    canvas.height = y;
    document.body.appendChild(canvas);
    var ctxt = canvas.getContext('2d');
    return { ctxt: ctxt, canvas: canvas };
}
function random(min, max) {
    return Math.random() * (max - min) + min;
}
var lastUpdate = Date.now();
function loop(callback) {
    var now = Date.now();
    callback((now - lastUpdate) / 1000);
    lastUpdate = now;
    requestAnimationFrame(() => {
        loop(callback);
    });
}
function mod(number, modulus) {
    return ((number % modulus) + modulus) % modulus;
}
var keys = {};
document.addEventListener('keydown', (e) => {
    keys[e.key] = true;
});
document.addEventListener('keyup', (e) => {
    keys[e.key] = false;
});
function getMoveInput() {
    var dir = new Vector(0, 0);
    if (keys['a'])
        dir.x--; //left
    if (keys['w'])
        dir.y++; //up
    if (keys['d'])
        dir.x++; //right
    if (keys['s'])
        dir.y--; //down
    return dir;
}
function getMoveInputYFlipped() {
    var input = getMoveInput();
    input.y *= -1;
    return input;
}
function loadTextFiles(strings) {
    var promises = [];
    for (var string of strings) {
        var promise = fetch(string)
            .then(resp => resp.text())
            .then(text => text);
        promises.push(promise);
    }
    return Promise.all(promises);
}
function loadImages(urls) {
    var promises = [];
    for (var url of urls) {
        promises.push(new Promise((res, rej) => {
            var image = new Image();
            image.onload = e => {
                res(image);
            };
            image.src = url;
        }));
    }
    return Promise.all(promises);
}
function findbestIndex(list, evaluator) {
    if (list.length < 1) {
        return -1;
    }
    var bestIndex = 0;
    var bestscore = evaluator(list[0]);
    for (var i = 1; i < list.length; i++) {
        var score = evaluator(list[i]);
        if (score > bestscore) {
            bestscore = score;
            bestIndex = i;
        }
    }
    return bestIndex;
}
function string2html(string) {
    var div = document.createElement('div');
    div.innerHTML = string;
    return div.children[0];
}
function lerp(a, b, r) {
    return a + to(a, b) * r;
}
function to(a, b) {
    return b - a;
}
function swap(arr, a = 0, b = 1) {
    var temp = arr[a];
    arr[a] = arr[b];
    arr[b] = temp;
}
function first(arr) {
    return arr[0];
}
function last(arr) {
    return arr[arr.length - 1];
}
function create2DArray(size, filler) {
    var result = new Array(size.y);
    for (var i = 0; i < size.y; i++) {
        result[i] = new Array(size.x);
    }
    size.loop2d(v => {
        result[v.y][v.x] = filler(v);
    });
    return result;
}
function get2DArraySize(arr) {
    return new Vector(arr[0].length, arr.length);
}
function index2D(arr, i) {
    return arr[i.x][i.y];
}
function copy2dArray(arr) {
    return create2DArray(get2DArraySize(arr), pos => index2D(arr, pos));
}
function round(number, decimals) {
    var mul = 10 ** decimals;
    return Math.round(number * mul) / mul;
}
var rng = new RNG(0);
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
    while (0 !== currentIndex) {
        randomIndex = Math.floor(rng.norm() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}
function remove(arr, value) {
    var index = arr.indexOf(value);
    if (index > -1) {
        arr.splice(index, 1);
    }
    return arr;
}
class StopWatch {
    constructor() {
        this.starttimestamp = Date.now();
        this.pausetimestamp = Date.now();
        this.pausetime = 0;
        this.paused = true;
    }
    get() {
        var currentamountpaused = 0;
        if (this.paused) {
            currentamountpaused = to(this.pausetimestamp, Date.now());
        }
        return to(this.starttimestamp, Date.now()) - (this.pausetime + currentamountpaused);
    }
    start() {
        this.paused = false;
        this.starttimestamp = Date.now();
        this.pausetime = 0;
    }
    continue() {
        if (this.paused) {
            this.paused = false;
            this.pausetime += to(this.pausetimestamp, Date.now());
        }
    }
    pause() {
        if (this.paused == false) {
            this.paused = true;
            this.pausetimestamp = Date.now();
        }
    }
    reset() {
        this.paused = true;
        this.starttimestamp = Date.now();
        this.pausetimestamp = Date.now();
        this.pausetime = 0;
    }
}
class Rule {
    constructor(message, cb) {
        this.message = message;
        this.cb = cb;
    }
}
class Ability {
    constructor(cb) {
        this.cb = cb;
        // ammo:number = 1
        // maxammo:number = 1
        // ammorechargerate:number = 1000
        // casttime:number = 2000
        // channelduration:number = 3000
        this.cooldown = 1000;
        this.lastfire = Date.now();
        this.rules = [
            new Rule('not ready yet', () => (this.lastfire + this.cooldown) < Date.now()),
        ];
        this.stopwatch = new StopWatch();
        this.ventingtime = 0;
        this.onCastFinished = new EventSystem();
        this.shots = 0;
        this.firing = false;
    }
    //positive if you need to wait 0 or negative if you can call it
    timeTillNextPossibleActivation() {
        return to(Date.now(), this.lastfire + this.cooldown);
    }
    canActivate() {
        return this.rules.every(r => r.cb());
    }
    callActivate() {
        this.cb();
    }
    fire() {
        if (this.firing == false) {
            this.startfire();
        }
        else {
            this.holdfire();
        }
    }
    releasefire() {
        this.firing = false;
    }
    tapfire() {
        this.startfire();
        this.releasefire();
    }
    startfire() {
        if (this.rules.some(r => r.cb())) {
            this.firing = true;
            this.ventingtime = 0;
            this.stopwatch.start();
            this.ventingtime -= this.cooldown;
            this.shots = 1;
            this.lastfire = Date.now();
            this.cb();
        }
    }
    holdfire() {
        this.ventingtime += this.stopwatch.get();
        this.stopwatch.start();
        this.shots = Math.ceil(this.ventingtime / this.cooldown);
        this.ventingtime -= this.shots * this.cooldown;
        this.lastfire = Date.now();
        if (this.shots > 0) {
            this.cb();
        }
    }
}
var AnimType;
(function (AnimType) {
    AnimType[AnimType["once"] = 0] = "once";
    AnimType[AnimType["repeat"] = 1] = "repeat";
    AnimType[AnimType["pingpong"] = 2] = "pingpong";
    AnimType[AnimType["extend"] = 3] = "extend";
})(AnimType || (AnimType = {}));
class Anim {
    constructor() {
        this.animType = AnimType.once;
        this.reverse = false;
        this.duration = 1000;
        this.stopwatch = new StopWatch();
        this.begin = 0;
        this.end = 1;
    }
    get() {
        var cycles = this.stopwatch.get() / this.duration;
        switch (this.animType) {
            case AnimType.once:
                return clamp(lerp(this.begin, this.end, cycles), this.begin, this.end);
            case AnimType.repeat:
                return lerp(this.begin, this.end, mod(cycles, 1));
            case AnimType.pingpong:
                var pingpongcycle = mod(cycles, 2);
                if (pingpongcycle <= 1) {
                    return lerp(this.begin, this.end, pingpongcycle);
                }
                else {
                    return lerp(this.end, this.begin, pingpongcycle - 1);
                }
            case AnimType.extend:
                var distPerCycle = to(this.begin, this.end);
                return Math.floor(cycles) * distPerCycle + lerp(this.begin, this.end, mod(cycles, 1));
        }
    }
}
class Rect {
    constructor(min, max) {
        this.min = min;
        this.max = max;
    }
    collidePoint(point) {
        for (var i = 0; i < this.min.vals.length; i++) {
            if (!inRange(this.min.vals[i], this.max.vals[i], point.vals[i])) {
                return false;
            }
        }
        return true;
    }
    size() {
        return this.min.to(this.max);
    }
    collideBox(other) {
        for (var i = 0; i < 2; i++) {
            if (!rangeOverlap(this.min[i], this.max[i], other.min[i], other.max[i])) {
                return false;
            }
        }
        return true;
    }
    getPoint(relativePos) {
        return this.min.c().add(this.size().mul(relativePos));
    }
    draw(ctxt) {
        var size = this.size();
        ctxt.fillRect(this.min.x, this.min.y, size.x, size.y);
    }
    move(pos) {
        var size = this.size();
        this.min = pos;
        this.max = this.min.c().add(size);
    }
    loop(callback) {
        var temp = this.max.c();
        this.size().loop(v2 => {
            temp.overwrite(v2);
            temp.add(this.min);
            callback(temp);
        });
    }
}
function rangeOverlap(range1A, range1B, range2A, range2B) {
    return range1A <= range2B && range2A <= range1B;
}
class EventQueue {
    constructor() {
        this.idcounter = 0;
        this.onProcessFinished = new EventSystem();
        this.onRuleBroken = new EventSystem();
        this.rules = [];
        this.discoveryidcounter = 0;
        this.listeners = [];
        this.events = [];
    }
    // listenDiscovery(type:string,megacb:(data:any,cb:(cbdata:any) => void) => void){
    //     this.listen(type,(dataAndCb:{data:any,cb:(ads:any) => void}) => {
    //         megacb(dataAndCb.data,dataAndCb.cb)
    //     })
    // }
    // startDiscovery(type:string,data: any, cb: (cbdata: any) => void) {
    //     this.addAndTrigger(type,{data,cb})
    // }
    listenDiscovery(type, cb) {
        this.listen(type, (discovery) => {
            cb(discovery.data, discovery.id);
        });
    }
    startDiscovery(type, data, cb) {
        let createdid = this.discoveryidcounter++;
        let listenerid = this.listen('completediscovery', (discovery) => {
            if (discovery.data.id == createdid) {
                this.unlisten(listenerid);
                cb(discovery.data.data);
            }
        });
        this.addAndTrigger(type, { data, id: createdid });
    }
    completeDiscovery(data, id) {
        this.addAndTrigger('completediscovery', { data, id });
    }
    listen(type, cb) {
        var id = this.idcounter++;
        this.listeners.push({
            id: id,
            type: type,
            cb,
        });
        return id;
    }
    listenOnce(type, cb) {
        let id = this.listen(type, (data) => {
            this.unlisten(id);
            cb(data);
        });
        return id;
    }
    unlisten(id) {
        var index = this.listeners.findIndex(o => o.id == id);
        this.listeners.splice(index, 1);
    }
    process() {
        while (this.events.length > 0) {
            let currentEvent = this.events.shift();
            let listeners = this.listeners.filter(l => l.type == currentEvent.type);
            let brokenrules = this.rules.filter(r => r.type == currentEvent.type && r.rulecb(currentEvent.data) == false);
            if (brokenrules.length == 0) {
                for (let listener of listeners) {
                    listener.cb(currentEvent.data);
                }
            }
            else {
                console.log(first(brokenrules).error);
                this.onRuleBroken.trigger({ event: currentEvent, error: first(brokenrules).error });
            }
        }
        this.onProcessFinished.trigger(0);
    }
    add(type, data) {
        this.events.push({
            type: type,
            data: data,
        });
    }
    addAndTrigger(type, data) {
        this.add(type, data);
        this.process();
    }
    addRule(type, error, rulecb) {
        this.rules.push({ type, error, rulecb });
    }
}
class EventSystem {
    constructor() {
        this.idcounter = 0;
        this.listeners = [];
    }
    listen(cb) {
        var listener = {
            id: this.idcounter++,
            cb: cb,
        };
        this.listeners.push(listener);
        return listener.id;
    }
    unlisten(id) {
        var index = this.listeners.findIndex(o => o.id == id);
        this.listeners.splice(index, 1);
    }
    trigger(val) {
        for (var listener of this.listeners) {
            listener.cb(val);
        }
    }
}
class Camera {
    constructor(ctxt) {
        this.ctxt = ctxt;
        this.pos = new Vector(0, 0);
        this.scale = new Vector(1, 1);
    }
    begin() {
        ctxt.save();
        var m = this.createMatrixScreen2World().inverse();
        ctxt.transform(m.a, m.b, m.c, m.d, m.e, m.f);
    }
    end() {
        ctxt.restore();
    }
    createMatrixScreen2World() {
        var a = new DOMMatrix([
            1, 0, 0, 1, -screensize.x / 2, -screensize.y / 2
        ]);
        var b = new DOMMatrix([
            this.scale.x, 0, 0, this.scale.y, this.pos.x, this.pos.y
        ]);
        return b.multiply(a);
    }
    screen2world(pos) {
        var dompoint = this.createMatrixScreen2World().transformPoint(new DOMPoint(pos.x, pos.y));
        return new Vector(dompoint.x, dompoint.y);
    }
    world2screen(pos) {
        var dompoint = this.createMatrixScreen2World().inverse().transformPoint(new DOMPoint(pos.x, pos.y));
        return new Vector(dompoint.x, dompoint.y);
    }
}
class Entity {
    constructor(init) {
        this.id = null;
        this.parent = null;
        this.type = '';
        this.name = '';
        this.children = [];
        // ordercount = 0
        // sortorder = 0
        this.synced = false;
        Object.assign(this, init);
        this.type = 'entity';
    }
    setChild(child) {
        //remove child from old parent
        var oldparent = Entity.globalEntityStore.get(child.parent);
        if (oldparent != null) {
            remove(oldparent.children, child.id);
        }
        this.children.push(child.id);
        child.parent = this.id;
        // child.sortorder = this.ordercount++
    }
    setParent(parent) {
        if (parent == null) {
            this.parent = null;
        }
        else {
            parent.setChild(this);
        }
    }
    getParent() {
        return Entity.globalEntityStore.get(this.parent);
    }
    descendant(cb) {
        return this.descendants(cb)[0];
    }
    descendants(cb) {
        var children = this._children(cb);
        var grandchildren = children.flatMap(c => c.descendants(cb));
        return children.concat(grandchildren);
    }
    child(cb) {
        return this._children(cb)[0];
    }
    _children(cb) {
        return this.children.map(id => Entity.globalEntityStore.get(id)).filter(cb);
    }
    allChildren() {
        return this._children(() => true);
    }
    remove() {
        remove(this.getParent().children, this.id);
        Entity.globalEntityStore.remove(this.id);
        this.removeChildren();
        return this;
    }
    inject(parent) {
        Entity.globalEntityStore.add(this);
        this.setParent(parent);
        return this;
    }
    removeChildren() {
        this.descendants(() => true).forEach(e => Entity.globalEntityStore.remove(e.id));
        this.children = [];
    }
    ancestor(cb) {
        var current = this;
        while (current != null && cb(current) == false) {
            current = Entity.globalEntityStore.get(current.parent);
        }
        return current;
    }
}
class Player extends Entity {
    constructor(init) {
        super();
        this.disconnected = false;
        this.dctimestamp = 0;
        Object.assign(this, init);
        this.type = 'player';
    }
}
/*
class ServerClient{
    
    output = new EventSystem<any>()
    sessionid: number = null
    constructor(public socket, public id){
        this.socket.on('message',(data) => {
            this.output.trigger(data)
        })
    }
    input(type,data){
        this.socket.emit('message',{type,data})
    }
}
class Server{
    // gamemanager: GameManager;
    output = new EventSystem<{type:string,data:any}>()
    clients = new Store<ServerClient>()
    sessionidcounter = 0
    onBroadcast = new EventSystem<{type:string,data:any}>()
    constructor(){
        this.gamemanager = new GameManager()
        Entity.globalEntityStore = this.gamemanager.entityStore;
        this.gamemanager.setupListeners()
        this.gamemanager.eventQueue.addAndTrigger('init',null)
        this.gamemanager.eventQueue.onProcessFinished.listen(() => {
            this.updateClients()
            set synced status of updated entities to true
        })
        this.gamemanager.broadcastEvent.listen((event) => {
            for(var client of this.clients.list()){
                client.input(event.type,event.data)
            }
        })
        this.gamemanager.sendEvent.listen((event) => {
            this.clients.list().filter(c => c.sessionid == event.sessionid).forEach(c => c.input(event.type,event.data))
        })
        setInterval(() => {
            var longdcedplayers = this.gamemanager.helper.getPlayers().filter(p => p.disconnected == true && (Date.now() - p.dctimestamp) > 5_000 )
            longdcedplayers.forEach(p => {
                console.log(`removed disconnected player:${p.name}`)
                p.remove()
            })
            if(longdcedplayers.length > 0){
                this.updateClients()
            }
        },5000)
    }
    updateClients(){
        this.gamemanager.broadcastEvent.trigger({type:'update',data:this.gamemanager.entityStore.list()})
    }
    connect(client:ServerClient){
        this.clients.add(client)
        let players = this.gamemanager.helper.getPlayers()
        //client does a handshake
        //if client sends sessionID look for a player with that sessionid
        //if not found or client sends no sessionid create a new player with a new sessionid
        //finish handshake by sending client and sessionid
        //when a client disconnects flag player as dc'ed and set dc timestamp after 2 min delete dc'ed players
        //client should connect, check for sessionid in localstore/sessionstorage
        //then initiate handshake send found sessionid
        //save session and client id on client and look in database for player with sessionid = client.sessionid
        client.socket.on('handshake',(data,fn) => {
            
            let sessionid = data.sessionid
            if(sessionid == null){
               sessionid = this.sessionidcounter++
            }
            this.sessionidcounter = Math.max(sessionid,this.sessionidcounter)//should create random guid instead
            client.sessionid = sessionid
            console.log(`user connected:${client.sessionid}`)
            let foundplayer = players.find(p => p.sessionid == sessionid)
            if(foundplayer == null){
                let player = new Player({clientid:client.id,sessionid:sessionid})
                player.inject(this.gamemanager.helper.getPlayersNode())
                
            }else{
                foundplayer.clientid = client.id
                foundplayer.disconnected = false
                //reconnection dont create new player but do change the pointer to the new client
            }
            fn({
                clientid:client.id,
                sessionid:sessionid,
            })
            this.updateClients()
        })
        
        
        client.socket.on('disconnect',() => {
            //watch out for multiple connected clients
            this.clients.remove(client.id)
            var sessionplayer = this.gamemanager.helper.getSessionPlayer(client.sessionid)
            console.log(`user disconnected:${client.sessionid}`)
            //this often goes wrong for some reason
            //maybe when multiple clients are connected the old player's clientid gets overwritten
            //also goes wrong when a second tab connects and disconnects
            // check if other clients use the same sessionid
            
            var connectedclients = this.clients.list().filter(c => c.sessionid == client.sessionid)
            if(connectedclients.length == 0){
                sessionplayer.disconnected = true
                sessionplayer.dctimestamp = Date.now()
            }
            
            this.updateClients()
        })
        client.output.listen(e => {
            server.input(e.type,{clientid:client.id,sessionid:client.sessionid,data:e.data})
        })
    }
    input(type,data){
        this.gamemanager.eventQueue.addAndTrigger(type,data)
    }
    serialize(){
        //only serialize unsynced entitys
        return JSON.stringify(this.gamemanager.entityStore.list())
    }
    
}
*/ 
var colormap = [
    [new Vector(0, 1, 0), 'white'],
    [new Vector(0, 0, -1), 'green'],
    [new Vector(1, 0, 0), 'red'],
    [new Vector(-1, 0, 0), 'orange'],
    [new Vector(0, -1, 0), 'yellow'],
    [new Vector(0, 0, 1), 'blue'],
];
var color2normalmap = {
    'W': new Vector(0, 1, 0),
    'G': new Vector(0, 0, -1),
    'R': new Vector(1, 0, 0),
    'O': new Vector(-1, 0, 0),
    'Y': new Vector(0, -1, 0),
    'B': new Vector(0, 0, 1),
};
var abbrevcolor2colormap = {
    'W': 'white',
    'G': 'green',
    'R': 'red',
    'O': 'orange',
    'Y': 'yellow',
    'B': 'blue',
};
var actionrotate2frontmap = {
    'F': new Vector(1, 0, 0).scale(1),
    'R': new Vector(0, -1, 0).scale(0.25),
    'U': new Vector(1, 0, 0).scale(0.25),
    'L': new Vector(0, 1, 0).scale(0.25),
    'D': new Vector(-1, 0, 0).scale(0.25),
    'B': new Vector(0, 1, 0).scale(0.5),
    'I': new Vector(0, 0, -1).scale(0.5),
    '0': new Vector(0, 1, 0).scale(1),
};
var rotmap = {
    'F': new Vector(0, 0, -1).scale(0.25),
    'R': new Vector(1, 0, 0).scale(0.25),
    'U': new Vector(0, 1, 0).scale(0.25),
    'L': new Vector(-1, 0, 0).scale(0.25),
    'D': new Vector(0, -1, 0).scale(0.25),
    'B': new Vector(0, 0, 1).scale(0.25),
    'F2': new Vector(0, 0, -1).scale(0.5),
    'R2': new Vector(1, 0, 0).scale(0.5),
    'U2': new Vector(0, 1, 0).scale(0.5),
    'L2': new Vector(-1, 0, 0).scale(0.5),
    'D2': new Vector(0, -1, 0).scale(0.5),
    'B2': new Vector(0, 0, 1).scale(0.5),
    'Fi': new Vector(0, 0, -1).scale(0.75),
    'Ri': new Vector(1, 0, 0).scale(0.75),
    'Ui': new Vector(0, 1, 0).scale(0.75),
    'Li': new Vector(-1, 0, 0).scale(0.75),
    'Di': new Vector(0, -1, 0).scale(0.75),
    'Bi': new Vector(0, 0, 1).scale(0.75),
};
class CubeLetFace {
    constructor(obj) {
        var _a;
        this.startnormal = (_a = obj === null || obj === void 0 ? void 0 : obj.normal) === null || _a === void 0 ? void 0 : _a.c();
        Object.assign(this, obj);
    }
    getStartPosition2D(cube) {
        return cube.convert3dto2d(this.parent.startpos, this.startnormal);
    }
    getCurrentPosition2D(cube) {
        return cube.convert3dto2d(this.parent.pos, this.normal);
    }
}
class CubeLet {
    constructor(obj) {
        this.faces = [];
        Object.assign(this, obj);
    }
}
class Cube {
    constructor() {
        this.cubelets = [];
        this.cubeletFaces = [];
        this.history = [];
        this.RNG = new RNG(0);
        this.directionsposmap = [
            [new Vector(0, 0, -1), new Vector(4, 4), Quaternion.fromAxisAngle(new Vector(0, 1, 0).vals, TAU * 0)],
            [new Vector(0, 0, 1), new Vector(10, 4), Quaternion.fromAxisAngle(new Vector(0, 1, 0).vals, TAU * 0.5)],
            [new Vector(0, 1, 0), new Vector(4, 1), Quaternion.fromAxisAngle(new Vector(1, 0, 0).vals, TAU * -0.25)],
            [new Vector(0, -1, 0), new Vector(4, 7), Quaternion.fromAxisAngle(new Vector(1, 0, 0).vals, TAU * 0.25)],
            [new Vector(1, 0, 0), new Vector(7, 4), Quaternion.fromAxisAngle(new Vector(0, 1, 0).vals, TAU * 0.25)],
            [new Vector(-1, 0, 0), new Vector(1, 4), Quaternion.fromAxisAngle(new Vector(0, 1, 0).vals, TAU * -0.25)],
        ];
        this.reset();
    }
    reset() {
        this.history = [];
        this.RNG.seed = 0;
        this.import(`      
        W,W,W,
        W,W,W,
        W,W,W,
  O,O,O,G,G,G,R,R,R,B,B,B,
  O,O,O,G,G,G,R,R,R,B,B,B,
  O,O,O,G,G,G,R,R,R,B,B,B,
        Y,Y,Y,
        Y,Y,Y,
        Y,Y,Y`);
    }
    copy() {
        return new Cube().import(this.export());
    }
    vector2action(vector) {
        var entries = Object.entries(rotmap);
        var i = findbestIndex(entries, ([key, value]) => {
            return -vector.to(value).length();
        });
        return entries[i][0];
    }
    action2vector(action) {
        return rotmap[action].c();
    }
    changePerspective(compositeActions, perspectives) {
        var res = [];
        for (var perspective of perspectives.split(/\s+/)) {
            for (var compositeAction of compositeActions) {
                var rotatedCompositeAction = '';
                for (var action of compositeAction.split(/\s+/)) {
                    var vector = this.action2vector(action);
                    axisRotate(vector, actionrotate2frontmap[perspective], actionrotate2frontmap[perspective].length());
                    rotatedCompositeAction += `${this.vector2action(vector)} `;
                }
                rotatedCompositeAction = rotatedCompositeAction.trim();
                res.push(rotatedCompositeAction);
            }
        }
        return res;
    }
    //could also give higher level actions
    generateGraph(actions) {
        this.graph2d = [];
        this.graph3d = [];
        var tempcube = new Cube();
        this.tempcube = tempcube;
        //3d ------------------------------------------
        for (var cubelet of tempcube.cubelets) {
            this.graph3d.push(new Knot({
                pos: cubelet.startpos.c(),
            }));
        }
        for (var action of actions) {
            tempcube.reset();
            tempcube.apply(action);
            for (var cubelet of tempcube.cubelets) {
                //edges are only usefull if the action moves the cubelet
                if (cubelet.pos.equals(cubelet.startpos) == false) {
                    var orginalknot = this.graph3d.find(k => k.pos.equals(cubelet.startpos));
                    var newknot = this.graph3d.find(k => k.pos.equals(cubelet.pos));
                    orginalknot.edges.push(new Edge({
                        target: newknot,
                        data: action,
                        cost: action.split(/\s+/).length,
                    }));
                }
            }
        }
        //3d -------------------------------------------------
        //2d ----------------------------------------------
        for (var face of tempcube.cubeletFaces) {
            var pos2d = face.getCurrentPosition2D(this);
            this.graph2d.push(new Knot({
                pos: pos2d,
            }));
        }
        for (var action of actions) {
            tempcube.reset();
            tempcube.apply(action);
            for (var face of tempcube.cubeletFaces) {
                if (face.getCurrentPosition2D(this).equals(face.getStartPosition2D(this)) == false) {
                    var originalknot = this.graph2d.find(k => k.pos.equals(face.getStartPosition2D(this)));
                    var newknot = this.graph2d.find(k => k.pos.equals(face.getCurrentPosition2D(this)));
                    originalknot.edges.push(new Edge({
                        target: newknot,
                        data: action,
                        cost: action.split(/\s+/).length,
                    }));
                }
            }
        }
    }
    pathfind2d(dest) {
        var misplacedface = this.cubeletFaces.find(f => f.getStartPosition2D(this).equals(dest));
        var start = this.graph2d.find(k => k.pos.equals(misplacedface.getCurrentPosition2D(this)));
        var goal = this.graph2d.find(k => k.pos.equals(misplacedface.getStartPosition2D(this)));
        return pathfind(start, goal, this.graph2d).map(e => e.data).join(' ');
    }
    pathfind3d(position) {
        var misplacedpiece = this.cubelets.find(c => c.startpos.equals(position));
        var start = this.graph3d.find(k => k.pos.equals(misplacedpiece.pos));
        var dest = this.graph3d.find(k => k.pos.equals(misplacedpiece.startpos));
        return pathfind(start, dest, this.graph3d).map(e => e.data).join(' ');
    }
    apply(rotations, savehistory = true, perspective = 'F') {
        if (rotations) {
            rotations = this.changePerspective([rotations], perspective)[0];
            if (savehistory) {
                this.history = this.history.concat(rotations.split(/\s+/));
            }
            var rots = this.string2rots(rotations);
            for (var rot of rots) {
                this.rot(rot.c().normalize(), rot.length());
            }
        }
        return rotations;
    }
    undo() {
        if (this.history.length) {
            var lastmove = this.history.splice(this.history.length - 1, 1)[0];
            var reverseaction = this.getReverseAction(lastmove);
            this.apply(reverseaction, false);
            return lastmove;
        }
    }
    string2rots(input) {
        return input.split(/\s+/).map(op => rotmap[op]);
    }
    rot(faceNormal, turns) {
        var cubelets = this.cubelets.filter(c => c.pos.c().normalize().dot(faceNormal) > 0.1);
        for (var cubelet of cubelets) {
            axisRotate(cubelet.pos, faceNormal, turns);
            for (var cubeletface of cubelet.faces) {
                axisRotate(cubeletface.normal, faceNormal, turns);
            }
        }
    }
    convert3dto2d(pos3d, normal) {
        var [valnormal, offset, quat] = this.directionsposmap.find(vals => vals[0].equals(normal));
        var frontrotated = Vector.fromArray(quat.rotateVector(pos3d.c().vals)).round();
        return new Vector(frontrotated.x + offset.x, frontrotated.y * -1 + offset.y);
    }
    convert2dto3d(pos) {
        return null;
    }
    genrandomize(count) {
        var rots = Object.keys(rotmap);
        var res = '';
        for (var i = 0; i < count; i++) {
            res += rots[Math.floor(Math.random() * rots.length)];
        }
        return res;
    }
    getReverseAction(action) {
        var v = this.action2vector(action);
        v.setMagnitude((v.length() * 3) % 1);
        return this.vector2action(v);
    }
    gensolve() {
        // https://rubiks-cube-solver.com/
        // https://cubesolve.com/
        // https://rubikscu.be/
        var errors = this.detectErrors();
        if (errors.length > 0) {
            throw errors;
        }
        var result = '';
        var tempcube = this.copy();
        this.tempcube = tempcube;
        // 1 solve white edges
        var composites = ['R Di Ri', 'R D Ri', 'L Di Li', 'L D Li'];
        composites = composites.concat(tempcube.changePerspective(composites, 'R L B'));
        tempcube.generateGraph(['F', 'B', 'R', 'L', 'U', 'D', 'Fi', 'Bi', 'Ri', 'Li', 'Ui', 'Di'].concat(composites));
        result += tempcube.apply(tempcube.pathfind2d(new Vector(4, 0))) + '\n';
        tempcube.generateGraph(['F', 'R', 'L', 'D', 'Fi', 'Ri', 'Li', 'Di'].concat(composites));
        result += tempcube.apply(tempcube.pathfind2d(new Vector(5, 1))) + '\n';
        tempcube.generateGraph(['F', 'L', 'D', 'Fi', 'Li', 'Di'].concat(composites));
        result += tempcube.apply(tempcube.pathfind2d(new Vector(4, 2))) + '\n';
        tempcube.generateGraph(['L', 'D', 'Li', 'Di'].concat(composites));
        result += tempcube.apply(tempcube.pathfind2d(new Vector(3, 1))) + '\n ';
        result += '\n';
        // 2 solve white corners
        composites = ['Ri Di R D', 'F D Fi Di', 'Ri D2 R D Ri Di R'];
        composites = composites.concat(tempcube.changePerspective(composites, 'R L B'));
        tempcube.generateGraph(['D', 'Di'].concat(composites));
        result += tempcube.apply(tempcube.pathfind2d(new Vector(3, 0))) + '\n';
        result += tempcube.apply(tempcube.pathfind2d(new Vector(5, 0))) + '\n';
        result += tempcube.apply(tempcube.pathfind2d(new Vector(5, 2))) + '\n';
        result += tempcube.apply(tempcube.pathfind2d(new Vector(3, 2))) + '\n';
        result += '\n';
        // 3 MIDDLE
        composites = tempcube.changePerspective(['Ui Li U L U F Ui Fi', 'U R Ui Ri Ui Fi U F'], 'I');
        composites = composites.concat(tempcube.changePerspective(composites, 'R L B'));
        tempcube.generateGraph(['D', 'Di'].concat(composites));
        result += tempcube.apply(tempcube.pathfind2d(new Vector(3, 4))) + '\n'; //2,4
        result += tempcube.apply(tempcube.pathfind2d(new Vector(5, 4))) + '\n'; //6,4
        result += tempcube.apply(tempcube.pathfind2d(new Vector(0, 4))) + '\n'; //11,4
        result += tempcube.apply(tempcube.pathfind2d(new Vector(8, 4))) + '\n'; //9,4
        result += '\n';
        // 4 CROSS
        //can this be done with pathfinding?
        //by creating graphs from different perspectives maybe
        //detect cross state
        composites = tempcube.changePerspective(['F R U Ri Ui Fi'], 'I');
        for (var i = 0; i < 10; i++) { //while not cross
            var output = [];
            if (tempcube.detect('X Y X - Y Y Y - X Y X', new Vector(4, 7), [1], output)) {
                break;
            }
            else if (tempcube.detect('X X X - Y Y Y - X X X', new Vector(4, 7), [1, 0.25], output)) {
                var rots = ['0', 'R'];
                var rotcomposites = tempcube.changePerspective(composites, rots[output[0]]).join(' ');
                result += tempcube.apply(rotcomposites) + '\n';
            }
            else if (tempcube.detect('X Y X - Y Y X - X X X', new Vector(4, 7), [1, 0.25, 0.5, 0.75], output)) {
                var rots = ['B', 'R', '0', 'L']; //todo check if R and L are in the right spot
                var rotcomposites = tempcube.changePerspective(composites, rots[output[0]]).join(' ');
                result += tempcube.apply(rotcomposites) + '\n';
            }
            else {
                result += tempcube.apply(composites[0]) + '\n';
            }
        }
        // result += '\n'
        // 5 swap last layer edges
        composites = ['R U Ri U R U2 Ri U']; //, 'R U Ri U R U2 Ri U y2 U yi R U Ri U R U2 Ri U'
        composites = composites.concat(tempcube.changePerspective(tempcube.changePerspective(composites, 'I'), 'R L B'));
        tempcube.generateGraph(composites);
        result += tempcube.apply(tempcube.pathfind2d(new Vector(4, 6))) + '\n';
        result += tempcube.apply(tempcube.pathfind2d(new Vector(5, 7))) + '\n';
        result += tempcube.apply(tempcube.pathfind2d(new Vector(4, 8))) + '\n';
        result += tempcube.apply(tempcube.pathfind2d(new Vector(3, 7))) + '\n';
        // result += '\n'
        // 6 position last layer corners
        composites = ['U R Ui Li U Ri Ui L'];
        composites = tempcube.changePerspective(tempcube.changePerspective(composites, 'I'), 'F R L B');
        tempcube.generateGraph(composites);
        result += tempcube.apply(tempcube.pathfind3d(new Vector(-1, -1, -1))) + '\n';
        composites = tempcube.changePerspective(['U R Ui Li U Ri Ui L'], 'I');
        tempcube.generateGraph(composites);
        result += tempcube.apply(tempcube.pathfind3d(new Vector(1, -1, -1))) + '\n';
        // result += '\n'
        //7 orient corners
        //for every corner
        //move it to FRU position
        //move yellow up with 2 x rdrd
        //last stup use U too fix top
        composites = tempcube.changePerspective(['Ri Di R D Ri Di R D'], 'I');
        for (var i = 0; i < 4; i++) {
            for (var j = 0; tempcube.detect('Y X X - X X X - X X X', new Vector(4, 7), [1], []) == false && j < 2; j++) {
                result += tempcube.apply(composites[0]) + '\n';
            }
            result += tempcube.apply('D') + '\n';
        }
        tempcube.generateGraph(['D']);
        result += tempcube.apply(tempcube.pathfind2d(new Vector(4, 5))) + '\n';
        return result.replace(/ +/g, ' ').trim();
    }
    //check pattern against 2dgrid
    detect(pattern, center, rotations, output) {
        var rows = pattern.split('-');
        var grid = rows.map(r => r.trim().split(/\s+/));
        var samplepoints = [
            new Vector(-1, -1), new Vector(0, -1), new Vector(1, -1),
            new Vector(-1, 0), new Vector(0, 0), new Vector(1, 0),
            new Vector(-1, 1), new Vector(0, 1), new Vector(-1, 1)
        ];
        for (var i = 0; i < rotations.length; i++) {
            var rotation = rotations[i];
            var match = true;
            for (var samplepoint of samplepoints) {
                var rotatedpoint = axisRotate(samplepoint.c(), new Vector(0, 0, 1), rotation).add(new Vector(1, 1));
                var patterncolor = grid[rotatedpoint.y][rotatedpoint.x];
                var face = this.getFace(samplepoint.c().add(center));
                if (patterncolor != 'X' && face.color[0].toUpperCase() != patterncolor) {
                    match = false;
                    break;
                }
            }
            if (match) {
                output.push(i);
            }
        }
        return output.length > 0;
    }
    getFace(position) {
        return this.cubeletFaces.find(f => f.getCurrentPosition2D(this).equals(position));
    }
    scramble() {
        rngseedelement.valueAsNumber = this.RNG.seed;
        var options = ['F', 'R', 'U', 'L', 'D', 'B'];
        var actions = '';
        for (var i = 0; i < 20; i++) {
            actions += `${options[Math.floor(this.RNG.range(0, options.length))]} `;
        }
        actions = actions.trim();
        return actions;
    }
    export() {
        var gf = (x, y) => {
            return this.getFace(new Vector(x, y)).color[0].toUpperCase();
        };
        return `
      ${gf(3, 0)},${gf(4, 0)},${gf(5, 0)},
      ${gf(3, 1)},${gf(4, 1)},${gf(5, 1)},
      ${gf(3, 2)},${gf(4, 2)},${gf(5, 2)},
${gf(0, 3)},${gf(1, 3)},${gf(2, 3)},${gf(3, 3)},${gf(4, 3)},${gf(5, 3)},${gf(6, 3)},${gf(7, 3)},${gf(8, 3)},${gf(9, 3)},${gf(10, 3)},${gf(11, 3)},
${gf(0, 4)},${gf(1, 4)},${gf(2, 4)},${gf(3, 4)},${gf(4, 4)},${gf(5, 4)},${gf(6, 4)},${gf(7, 4)},${gf(8, 4)},${gf(9, 4)},${gf(10, 4)},${gf(11, 4)},
${gf(0, 5)},${gf(1, 5)},${gf(2, 5)},${gf(3, 5)},${gf(4, 5)},${gf(5, 5)},${gf(6, 5)},${gf(7, 5)},${gf(8, 5)},${gf(9, 5)},${gf(10, 5)},${gf(11, 5)},
      ${gf(3, 6)},${gf(4, 6)},${gf(5, 6)},
      ${gf(3, 7)},${gf(4, 7)},${gf(5, 7)},
      ${gf(3, 8)},${gf(4, 8)},${gf(5, 8)}`;
    }
    import(data) {
        var colorsgrid = data.trim().split('\n').map(row => row.split(',').filter((cell) => cell != false).map(cell => cell.trim()));
        for (var i of [0, 1, 2, 6, 7, 8]) {
            colorsgrid[i].splice(0, 0, null, null, null);
        }
        this.cubelets = [];
        this.cubeletFaces = [];
        for (var x = -1; x < 2; x++) {
            for (var y = -1; y < 2; y++) {
                for (var z = -1; z < 2; z++) {
                    var normals = [];
                    if (x != 0) {
                        normals.push(new Vector(x, 0, 0));
                    }
                    if (y != 0) {
                        normals.push(new Vector(0, y, 0));
                    }
                    if (z != 0) {
                        normals.push(new Vector(0, 0, z));
                    }
                    var cubelet = new CubeLet({
                        pos: new Vector(x, y, z),
                        startpos: new Vector(0, 0, 0),
                        type: {
                            0: 'core',
                            1: 'center',
                            2: 'edge',
                            3: 'corner',
                        }[normals.length],
                    });
                    this.cubelets.push(cubelet);
                    for (var normal of normals) {
                        var vec2d = this.convert3dto2d(new Vector(x, y, z), normal);
                        var colorabrrev = colorsgrid[vec2d.y][vec2d.x];
                        var startnormal = color2normalmap[colorabrrev];
                        for (var i = 0; i < 3; i++) {
                            if (startnormal.vals[i] != 0) {
                                cubelet.startpos.vals[i] = startnormal.vals[i];
                            }
                        }
                        var newface = new CubeLetFace({
                            color: abbrevcolor2colormap[colorabrrev],
                            parent: cubelet,
                            normal: normal,
                            startnormal: startnormal,
                        });
                        cubelet.faces.push(newface);
                        this.cubeletFaces.push(newface);
                    }
                }
            }
        }
        return this;
    }
    detectErrors() {
        var combis = {};
        var errors = [];
        for (var cubelet of this.cubelets) {
            var sp = vec2string(cubelet.startpos);
            if (sp in combis) {
                var colorsofcubelet = cubelet.faces.map(f => f.color).join(',');
                errors.push(`duplicate piece (${colorsofcubelet}) pos:${vec2string(combis[sp])} pos2: ${vec2string(cubelet.pos)}`);
            }
            combis[sp] = cubelet.pos;
        }
        return errors;
    }
}
function vectorequals(a, b) {
    return a.x == b.x && a.y == b.y && a.z == b.z;
}
function isSameDirection(a, b, slag) {
    return a.c().normalize().dot(b) > slag;
}
function axisRotate(v, axis, turns) {
    var added = false;
    if (v.vals.length == 2) {
        v.vals.push(0);
        added = true;
    }
    var quat = Quaternion.fromAxisAngle(axis.vals, turns * TAU);
    v.vals = quat.rotateVector(v.vals);
    if (added) {
        v.vals.splice(v.vals.length - 1, 1);
    }
    v.round();
    return v;
}
function vec2string(v) {
    return v.vals.join(',');
}
class Knot {
    constructor(obj) {
        this.edges = [];
        Object.assign(this, obj);
    }
}
class Edge {
    constructor(obj) {
        Object.assign(this, obj);
    }
}
function pathfind(start, dest, graph) {
    for (var knot of graph) {
        knot.cost = Number.MAX_VALUE;
        knot.predecessor = null;
    }
    start.cost = 0;
    var explored = [];
    var frontier = [start];
    while (frontier.length > 0) {
        var smallest = 0;
        for (var i = 1; i < frontier.length; i++) {
            if (frontier[i].cost < frontier[smallest].cost) {
                smallest = i;
            }
        }
        var current = frontier.splice(smallest, 1)[0];
        if (current == dest) {
            break;
        }
        for (var edge of current.edges) {
            if (current.cost + edge.cost < edge.target.cost) {
                edge.target.predecessor = current;
                edge.target.usedEdge = edge;
                edge.target.cost = current.cost + edge.cost;
                frontier.push(edge.target);
            }
        }
        explored.push(current);
    }
    return traceback(start, dest);
}
function traceback(start, destination) {
    var res = [];
    var current = destination;
    while (current != start && current != null) {
        res.push(current.usedEdge);
        current = current.predecessor;
    }
    return res.reverse();
}
/// <reference path="libs/vector/vector.ts" />
/// <reference path="libs/utils/rng.ts" />
/// <reference path="libs/utils/store.ts" />
/// <reference path="libs/utils/table.ts" />
/// <reference path="libs/utils/utils.ts" />
/// <reference path="libs/utils/stopwatch.ts" />
/// <reference path="libs/utils/ability.ts" />
/// <reference path="libs/utils/anim.ts" />
/// <reference path="libs/rect/rect.ts" />
/// <reference path="libs/event/eventqueue.ts" />
/// <reference path="libs/event/eventsystem.ts" />
/// <reference path="libs/utils/camera.ts" />
/// <reference path="libs/networking/entity.ts" />
/// <reference path="libs/networking/server.ts" />
/// <reference path="cube.ts" />
/// <reference path="pathfind.ts" />
//seeds that cant be solved atm
// G,R,O,
// G,W,O,
// G,W,G,
// O,Y,Y,R,O,R,W,G,Y,G,B,W,
// Y,O,W,R,G,W,G,R,G,R,B,O,
// B,O,Y,R,B,R,W,B,W,O,R,Y,
// B,Y,B,
// B,Y,W,
// O,Y,B,
var gridsize = 50;
var screensize = new Vector(1000, 500);
var { canvas, ctxt } = createCanvas(screensize.x, screensize.y);
var cube = new Cube();
var rotbtncontainer = document.querySelector('#rotbtncontainer');
var rngseedelement = document.querySelector('#seedvalue');
var erroroutput = document.querySelector('#erroroutput');
cube.RNG.seed = rngseedelement.valueAsNumber;
rngseedelement.addEventListener('change', e => {
    cube.RNG.seed = rngseedelement.valueAsNumber;
});
for (let action of 'F B R L U D'.split(/\s+/)) {
    rotbtncontainer.insertAdjacentHTML('beforeend', `<button>${action}</button>`);
    let btn = rotbtncontainer.lastElementChild;
    btn.addEventListener('click', () => {
        cube.apply(action, true, perspectiveSelect.value);
    });
}
var invrotbtncontainer = document.querySelector('#invrotbtncontainer');
for (let action of 'Fi Bi Ri Li Ui Di'.split(/\s+/)) {
    invrotbtncontainer.insertAdjacentHTML('beforeend', `<button>${action}</button>`);
    let btn = invrotbtncontainer.lastElementChild;
    btn.addEventListener('click', () => {
        cube.apply(action, true, perspectiveSelect.value);
    });
}
var doublerotbtncontainer = document.querySelector('#doublerotbtncontainer');
for (let action of 'F2 B2 R2 L2 U2 D2'.split(/\s+/)) {
    doublerotbtncontainer.insertAdjacentHTML('beforeend', `<button>${action}</button>`);
    let btn = doublerotbtncontainer.lastElementChild;
    btn.addEventListener('click', () => {
        cube.apply(action, true, perspectiveSelect.value);
    });
}
function createButton(name, callback) {
    var specialbuttoncontainer = document.querySelector('#specialbtncontainer');
    specialbuttoncontainer.insertAdjacentHTML('beforeend', `<button>${name}</button>`);
    specialbuttoncontainer.lastElementChild.addEventListener('click', callback);
}
var perspectiveSelect = document.querySelector('#perspectiveSelect');
var outputinput = document.querySelector('#outputinput');
createButton('Reset', e => cube.reset());
createButton('Scramble', e => outputinput.value = cube.scramble());
createButton('Solve', e => {
    try {
        outputinput.value = cube.gensolve();
        erroroutput.innerText = '';
    }
    catch (errors) {
        erroroutput.innerText = errors.join('\n');
    }
});
createButton('Apply', (e) => {
    cube.apply(outputinput.value, true, perspectiveSelect.value);
    if (e.ctrlKey == false) {
        outputinput.value = '';
    }
});
createButton('Apply1', e => {
    cube.apply(take1fromoutputinput(), true, perspectiveSelect.value);
});
createButton('Undo', e => {
    var out = cube.undo();
    if (out) {
        outputinput.value = out + ' ' + outputinput.value;
    }
});
createButton('Scramble & Solve', e => {
    cube.apply(cube.scramble());
    try {
        var out = cube.gensolve();
        cube.apply(out);
        outputinput.value = out;
        erroroutput.innerText = '';
    }
    catch (errors) {
        erroroutput.innerText = errors.join('\n');
    }
});
createButton('export', e => {
    outputinput.value = cube.export();
});
createButton('import', e => { cube.import(outputinput.value); });
document.addEventListener('keydown', e => {
    var keymap = {
        'KeyU': 'U',
        'KeyF': 'F',
        'KeyD': 'D',
        'KeyL': 'L',
        'KeyB': 'B',
        'KeyR': 'R',
    };
    if (keymap[e.code] && document.activeElement != outputinput) {
        cube.apply(keymap[e.code], true, perspectiveSelect.value);
    }
});
loop((dt) => {
    ctxt.fillStyle = 'black';
    ctxt.fillRect(0, 0, screensize.x, screensize.y);
    drawCube(cube, ctxt);
});
function drawCube(cube, ctxt) {
    for (var face of cube.cubeletFaces) {
        var pos2d = cube.convert3dto2d(face.parent.pos, face.normal);
        var abs = pos2d.c().scale(gridsize);
        ctxt.fillStyle = face.color;
        ctxt.fillRect(abs.x, abs.y, gridsize, gridsize);
        // ctxt.fillStyle = 'black'
        // ctxt.textAlign = 'center'
        // ctxt.textBaseline = 'middle'
        // ctxt.fillText(`${pos2d.x},${pos2d.y}`,abs.x + gridsize / 2,abs.y + gridsize / 2)
    }
}
function take1fromoutputinput() {
    var index = outputinput.value.search(/\s+/);
    var out = outputinput.value.substr(0, index);
    outputinput.value = outputinput.value.substr(index).trim();
    return out;
}