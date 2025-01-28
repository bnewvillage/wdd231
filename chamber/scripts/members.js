export async function getMembers(jsonFile) {
    const response = await fetch(jsonFile);
     if (response.ok){
        const data = await response.json();
        return data;
     }
}

function shuffledBusinesses(array){
    return array.sort(() => 0.5 - Math.random());
}

export function generateFeatured(membersArray){
    const topMembers = membersArray.filter(member =>{
        return member.membershipLevel > 1;
    })
    const shuffledBusiness = shuffledBusinesses(topMembers);
    const threeBusinesses = shuffledBusiness.slice(0,3);
    return threeBusinesses;
}