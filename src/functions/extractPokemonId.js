export function extractPokemonId(url) {
    const sections = url.split('/')
    return sections[6]
}