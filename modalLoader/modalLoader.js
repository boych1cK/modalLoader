class ModalLoader {
    constructor() {
        this.modalContainer = null;
        this.modalContent = null;
        this.init();
    }

    init(){
        if (!document.getElementById('myModal')) {
            this.createModalContainer();
        } else {
            this.modalContainer = document.getElementById('myModal');
            this.modalContent = this.modalContainer.querySelector('.modal-content');
        }
        this.addBackdropClickHandler();
    }

    createModalContainer() {
        this.modalContainer = document.createElement('div');
        this.modalContainer.id = 'myModal';
        this.modalContainer.classList.add('modal');
        document.body.appendChild(this.modalContainer);
        this.modalContent = document.createElement('div');
        this.modalContent.classList.add('modal-content', 'transparent');
        this.modalContainer.appendChild(this.modalContent);
    }

    addBackdropClickHandler() {
        this.modalContainer.addEventListener('click', (event) => {
            console.log('click detected', event.target, this.modalContainer);
            if (event.target === this.modalContainer) {
                console.log('closing modal');
                this.closeModal();
            }
        });
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
            success: (response) => {
                addBackdropClickHandler();
                $(el).prop('disabled', false);
                $(el).removeClass('disabled');
                if(response.success) {
                    this.showModal(response.data['html']);
                } else {
                    showMessage(response.data, 'error');
                }
            }
        });
    }

    setLoader(){
        if (this.modalContent) {
            this.modalContent.innerHTML = '<div class="spinner"></div>';
        }
        $(this.modalContainer).css('display','flex');
    }

    showModal(html) {
        if (this.modalContent) {
            this.modalContent.innerHTML = html;
        }
        $(this.modalContainer).css('display','flex');
    }

    closeModal(){
        $(this.modalContainer).css('display','none');
    }
}

document.addEventListener('DOMContentLoaded', () => {
    window.modalLoader = new ModalLoader();
});
