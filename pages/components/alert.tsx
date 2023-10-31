export function Customalert(error_code:string){
    switch(error_code){
        case 'wrong_password':{ alert('Nepareiza parole!') 
        break}
        case 'user_not_found':{ alert('Tads profils nepastav!')
        break}
        case 'invalid_email':{ alert('Nepareizs e-pasts')
        break}
        case 'invalid_username':{ alert('Nepareizs lietotajvards')
        break}
        case 'username_taken':{ alert('Tads lietotajs jau pastav')
        break}
        default: alert('Nezinams error')
    }
}