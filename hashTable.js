class KeyPair {
    constructor(key, value) {
        this.key = key;
        this.value = value;
    }
}
class HashMap {
    constructor(capacity = 100) {
        this.capacity = capacity;
        this.table = [];
    }
    
    // TODO #1: remove usage of built in {}s (We are making this DS after all) DONE
    // TODO #2: fix set() so that duplicate keys are properly overridden DONE
    // TODO #3: implement delete(key) DONE

    delete(key) {

        const hashCode = key.hashCode();
        const idx = hashCode % this.capacity;

        // find the collision bucket for key
        // remove KeyPair with key from collision bucket
        // for kp in collisions
        // if kp.key === key
        //   collisions.filter(kp => kp.key === key)
        if(this.table[idx]) {
            let collisions = this.table[idx];
            this.table[idx] = collisions.filter(kp => kp.key !== key);
        }
    }

    get(key) {
        // check to see if theres a list at this.table[key.hashCode() % this.capacity],
        const hashCode = key.hashCode();
        const idx = hashCode % this.capacity;
        
        // if no list found, key not there (throw exception)!
        if(!this.table[idx]) {
            throw new Error("KeyError: LOL");
        }
        const collisions = this.table[idx]; // [KeyPair, KeyPair]
        // if so, iterate the list to find the value at "key"
        for(let entry of collisions) {
            // entry: KeyPair
            if(entry.key === key) {
                return entry.value;
            }
        }
        // if no item is list has "key", key not there (throw exception)
        throw new Error("KeyError: LOL");

    }

    set(key, value) {
        // get hashCode from key
        const hashCode = key.hashCode();
        const idx = hashCode % this.capacity;

        // we need some way to gracefully handle collisions

        // check to see if theres something at this.table[idx]
        if(!this.table[idx]) {
            // we could store a list at that position, and append the value to it
            this.table[idx] = [];
        }
        // [null, {"otherGuy", "Hector"}]
        // [["firstName", "Devon"], ["otherGuy", "Hector"]]
        // [KeyPair, KeyPair]

        
        // TODO: if we are assigning a duplicate key, make sure to overwrite in collision list
        // if "key" already exists in collisions
        let collisions = this.table[idx]; // collisions => [KeyPair, KeyPair, ...]
        
        for(let i = 0; i < collisions.length; i++) {
            if(collisions[i].key === key) {
                collisions[i].value = value;
                return;
            }
        }
        
        //  then assign new value to that KeyPair object
        // else push new KeyPair object to collisions
        let kvp = new KeyPair(key, value);
        this.table[idx].push(kvp);

        // assign value to key

    }
}

let hashy = new HashMap();