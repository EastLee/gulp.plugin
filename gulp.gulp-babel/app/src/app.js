import obj from './app1';

class Fun {
    test() {
        console.info('test');
    }
    done() {
        console.info('done');
    }
}


let arr = [1,2,3];
let [a,c]= [...arr];
let {first,last} = obj;
