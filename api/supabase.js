const { createClient } = require('@supabase/supabase-js')

const SUPABASE_URL = process.env.SUPABASE_URL
const SUPABASE_KEY = process.env.SUPABASE_KEY

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY)

const get_inquires = async () => {
    let { data, error } = await supabase
      .from('new-inquires')
      .select('*')
      .order('added', {ascending: true})
      .limit(1)
  
    if (error) {
      console.error(error)
      return
    }
  
    console.log(data)
    return data;
  }
  
  get_inquires()