const { createClient } = require('@supabase/supabase-js')

const SUPABASE_URL = process.env.SUPABASE_URL
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)

const get_inquires = async (table) => {

    let tableValue = table;
    
    let { data, error } = await supabase
      .from(tableValue)
      .select('*')
      .order('added', {ascending: false})
      .limit(1)
  
    if (error) {
      console.error(error)
      return
    }
  
    console.log(data)
    return data;
  }

  module.exports = {
    get_inquires
  }