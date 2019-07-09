import Realm from 'realm'

class User {

    static create({compSeq, compCode, ...user}) {
        // resetAll();
        // User.createOb(user);
        realm.write(() => realm.delete(realm.objects('Device')));
        realm.write(() => realm.create('Device', {compSeq, compCode}));
    }

    update = data => realm.write(() => Object.keys(data).map(key => this[key] = data[key]))
}

User.schema = {
    name: 'User',
    properties: {
        compSeq: 'int',
        compCode: 'string',
        logoName: {type: 'string', optional: true},
        logoImage: {type: 'string', optional: true},
        printName: {type: 'string', optional: true},
        printImage: {type: 'string', optional: true},
        greeting: {type: 'string', optional: true},
    }
};

export const schemaVersion = 1; // 생략할 경우 기본 값 0. 이전 데이터에서 스키마를 변경한 경우,
                                // 반드시 Realm을 초기화하는 시점에서 schemaVersion을 지정
const schema = [Device];

const resetAll = () => schema.map(s => s.reset());

let realm = new Realm({schema, schemaVersion});

schema.forEach(ObjectType => {
    const schemaName = ObjectType.schema.name;
    ObjectType.get = pk => pk ? realm.objectForPrimaryKey(schemaName, pk) : realm.objects(schemaName);
    ObjectType.createOb = data => realm.write(() => realm.create(schemaName, data));
    ObjectType.reset = () => realm.write(() => realm.delete(ObjectType.get()));
});

class DB {
    static logout = () => resetAll();
    static setDevice = (compSeq, compCode) => Device.create({compSeq, compCode});
    static getDevice = () => {
        const list = Device.get();
        return list.length > 0 ? list[0] : undefined
    }
}

export {DB};