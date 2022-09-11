export interface EDT {
	_id: string
	edt: Array<{
		day?: 'Lundi' | 'Mardi' | 'Mercredi' | 'Jeudi' | 'Vendredi'
		hour?: string
		salle?: string
		groupe?: string
		type: 'TD' | 'TP' | 'TD/TP' | 'CM'
		name?: string
	}>
}
