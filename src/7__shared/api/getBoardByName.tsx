import supabase from "../../2__processes/supabase";

export async function getBoardsByName(setLoading : (arg: boolean) => void , boardName: string, userId: string){
  try {
    setLoading(true);
    const { data, error } = await supabase
    .from('Boards')
    .select("*")
    
    .eq("user_id", userId)
    .eq("name", boardName)
    .single();

    return error ?? data;
  } catch (error) {
    console.log(error, "asdasd")
    return {};
  } finally{
    setLoading(false)
  }
}