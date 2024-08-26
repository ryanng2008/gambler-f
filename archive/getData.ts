 //const data = await Promise.all(
        //    codes.map(async (code) => {
        //        const subsectionObject = await sql`
        //            SELECT * from subsections
        //            WHERE code = ${code};
        //            `
        //        console.log(`Finished fetching subsection ${code}`)
        //        //console.log(subsectionObject.rows)
        //        return subsectionObject.rows[0];
        //    })
        //)
        //return data;


         // OLD BULK MAP

    //try {
    //    const codeString = codes.map(code => `'${code}'`).join(', ');
    //    // because sql function interprets the codeString as ONE item. 
    //    const data = await sql`SELECT * from subsections WHERE code = ANY ('{"000000", "000001"}');`;
    //    console.log('Fetching subsections from codes completed.');
    //    return data.rows;
    //} catch (error) {
    //    console.error('Database fetch subsections from codes array error: ', error);
    //    throw new Error(`Failed to fetch subsections from ${codes}`);
    //}
    
    // SELECT *
    // FROM subsections
    // WHERE code = ANY (
    // SELECT array_column
    // FROM other_table
    // WHERE some_condition);