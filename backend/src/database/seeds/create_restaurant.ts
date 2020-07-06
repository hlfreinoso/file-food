import Knex from 'knex'

export async function seed(knex: Knex) {
    await knex('RESTAURANTS').delete()
    await knex('RESTAURANTS').insert([
        { name: 'Tia Neide', email: 'contato@tianeide.com.br', whatsapp: '47999999999', latitude: -26.4838066579063, longitude: -49.0848407149315, adress: 'R. Expedicionário Antônio Carlos Ferreira, 197', uf: 'SC', city: 'Jaraguá do Sul', maxWaitTime: '5', password: '1234', thumbnail: 'https://f.i.uol.com.br/fotografia/2020/07/02/15937195225efe3ae20d11a_1593719522_3x2_rt.jpg' },
        { name: 'Stannis Pub', email: 'contato@stannis.com.br', whatsapp: '47999999999', latitude: -26.4823710069254, longitude: -49.0827968716621, adress: 'Av. Mal. Deodoro da Fonseca, 104', uf: 'SC', city: 'Jaraguá do Sul', maxWaitTime: '10', password: '1234', thumbnail: 'https://www.viagemegastronomia.com.br/wp-content/uploads/2019/08/Anna-Bistro%CC%81-insider-2-768x510.jpg' },
        { name: 'Itajara', email: 'contato@itajara.com.br', whatsapp: '47999999999', latitude: -26.4812378383118, longitude: -49.084931910038, adress: 'R. Expedicionário Gumercindo da Silva, 237', uf: 'SC', city: 'Jaraguá do Sul', maxWaitTime: '15', password: '1234', thumbnail: 'https://uploads.metropoles.com/wp-content/uploads/2020/06/10165709/WhatsApp-Image-2020-06-10-at-16.51.33.jpg' }
    ])
}