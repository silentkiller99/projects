
let list = [{ Name: 'Ravindra', Sports: ['Chess', 'Cricket'] },
    { Name: 'Ravi', Sports: ['Cricket', 'Football'] },
    { Name: 'Rishabh', Sports: ['Table-Tennis', 'Football'] }];

const finallist = list.reduce((groupedsports,obj) => {
    obj.Sports.forEach(sports => {
        if (groupedsports[sports] == null)
            groupedsports[sports] = [];
        groupedsports[sports].push(obj.Name);
    });
    return groupedsports;
}, {});

console.log(finallist);