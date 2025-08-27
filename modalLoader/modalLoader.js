class ModalLoader {
    constructor() {
        this.modalContainer = null;
        this.init();
    }

    init(){
        if (!document.getElementById('myModal')) {
            this.createModalContainer();
        } else {
            this.modalContainer = document.getElementById('myModal');
        }
    }

    createModalContainer() {
        this.modalContainer = document.createElement('div');
        this.modalContainer.id = 'myModal';
        this.modalContainer.classList.add('modal');
        document.body.appendChild(this.modalContainer);
        this.modalContainer.innerHTML = `
            <div class="modal-content transparent">
               
            </div>
        `;
    }

    getModal(action, el){
        let data = {
            'action': action,
            'security': ajax_object.security
        };
        $(el).prop('disabled', true)
            .addClass('disabled');
        this.setLoader()
        $.ajax({
            type: 'POST',
            url: ajax_object.ajaxurl,
            data: data,
            dataType: 'json',
            success: function(response) {
                $(el).prop('disabled', false);
                $(el).removeClass('disabled');
                if(response.success) {
                    $('.modal').css('display','flex');
                    $('.modal').html(response.data['html']);
                    console.log(response);
                } else {
                    showMessage(response.data, 'error');
                }

            }
        });
    }
    setLoader(){
        $(this.modalContainer).html('<div class="spinner"></div>');
        $(this.modalContainer).css('display','flex');
    }

    closeModal(){
        $(this.modalContainer).css('display','none');
    }
}

document.addEventListener('DOMContentLoaded', () => {
    window.modalLoader = new ModalLoader();
});