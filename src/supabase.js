import { createClient } from '@supabase/supabase-js'

// Supabase Configuration
// Get these from: https://supabase.com/dashboard → Your Project → Settings → API
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'YOUR_SUPABASE_URL'
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'YOUR_SUPABASE_ANON_KEY'

export const supabase = createClient(supabaseUrl, supabaseKey)

// Products API
export const productsApi = {
    // Get all products
    async getAll() {
        const { data, error } = await supabase
            .from('products')
            .select('*')
            .order('created_at', { ascending: false })
        if (error) throw error
        return data
    },

    // Add product
    async add(product) {
        const { data, error } = await supabase
            .from('products')
            .insert([product])
            .select()
            .single()
        if (error) throw error
        return data
    },

    // Update product
    async update(id, updates) {
        const { data, error } = await supabase
            .from('products')
            .update(updates)
            .eq('id', id)
            .select()
            .single()
        if (error) throw error
        return data
    },

    // Delete product
    async delete(id) {
        const { error } = await supabase
            .from('products')
            .delete()
            .eq('id', id)
        if (error) throw error
        return true
    }
}
