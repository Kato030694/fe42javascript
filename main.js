var nguoiDungService = new NguoiDungService;

getListUser();
function getListUser(){
    nguoiDungService
    .layDanhSachNguoiDung()
    .then(function(result){
        renderTable(result.data);
    })
    .catch(function(error){
        console.log(error);
    });
    function ThemNguoiDung(){
        console.log("them nguoi dung nguyen2");
    }
}
function renderTable(arr){
    var contentHTML =  "";
    arr.forEach(function(item, index){
        contentHTML += `
        <tr>
            <td>${index + 1}</td>
            <td>${item.taiKhoan}</td>
            <td>${item.matKhau}</td>
            <td>${item.hoTen}</td>
            <td>${item.email}</td>
            <td>${item.soDT}</td>
            <td>${item.maLoaiNguoiDung}</td>
            <td>
                <button class="btn btn-info" data-target="#myModal" data-toggle="modal" 
                onclick="editUser(${item.id})">Sua</button>
                <button class="btn btn-danger" onclick ="deleteUser(${item.id})">Xoa</button>
            </td>
        </tr>`;
    });
    getEle("tblDanhSachNguoiDung").innerHTML = contentHTML;
}
// Thêm người dùng
getEle("btnThemNguoiDung").addEventListener("click",function(){
    var footer = "<button class='btn btn-success' onclick='addUser()'>Add user </buton>"
    document.getElementsByClassName("modal-footer")[0].innerHTML = footer;
    document.getElementsByClassName("modal-title")[0].innerHTML = "Add User";

    getEle("TaiKhoan").removeAttribute("disabled");
    getEle("TaiKhoan").value = "";
    getEle("HoTen").value = "";
    getEle("MatKhau").value = "";
    getEle("Email").value = "";
    getEle("SoDienThoai").value = "";
    getEle("loaiNguoiDung").value = "";
});

/**
 * AddUser
 * 
 */
function addUser(){
    var taiKhoan = getEle("TaiKhoan").value;
    var hoTen = getEle("HoTen").value;
    var matKhau = getEle("MatKhau").value;
    var email = getEle("Email").value;
    var soDT = getEle("SoDienThoai").value
    var loaiNguoiDung = getEle("loaiNguoiDung").value;
    
    var user = new NguoiDung(taiKhoan, hoTen, matKhau, email, soDT, loaiNguoiDung);
    console.log(user);
    
    nguoiDungService
    .themNguoiDung(user)
    .then(function(result){
        // tự f5 lại form
        getListUser();
    })
    .catch(function(err){
        console.log(err);
    });
}

/**Delete User
*/
function deleteUser(id){
    nguoiDungService.xoaNguoiDung(id)
    .then(function(result){
        getListUser();
    })
    .catch(function(err){
        console.log(err);
    });
}
/**
 * 
 * Sửa người dùng
 */
function editUser(id){
    /**
     * Thay đổi text Header của Modal
     * thêm nút "Update" ở dưới footer modal.
     */
    var footer = `<button class="btn btn-success" onclick="updateUser(${id})">Update</button>`;

    document.getElementsByClassName("modal-title")[0].innerHTML = "Update User";
    document.getElementsByClassName("modal-footer")[0].innerHTML = footer;
    nguoiDungService.layThongTinNguoiDung(id)
    .then(function(result){
       /**
        * Đổ thông tin ra ngoài Input trên Modal
        */
        getEle("TaiKhoan").value = result.data.taiKhoan;
        getEle("TaiKhoan").setAttribute("disabled", true);
        getEle("HoTen").value = result.data.hoTen;
        getEle("MatKhau").value = result.data.matKhau;
        getEle("Email").value = result.data.email;
        getEle("SoDienThoai").value = result.data.soDT;
        getEle("loaiNguoiDung").value = result.data.maLoaiNguoiDung;
        getListUser();
    })
    .catch(function(err){
        console.log(err);
    })
}

// Update User
function updateUser(id){
    var taiKhoan = getEle("TaiKhoan").value;
    var hoTen = getEle("HoTen").value;
    var matKhau = getEle("MatKhau").value;
    var email  = getEle("Email").value;
    var soDT = getEle("SoDienThoai").value;
    var loaiNguoiDung = getEle("loaiNguoiDung").value;
    
    var user = new NguoiDung(
        taiKhoan,
        hoTen, 
        matKhau, 
        email, 
        soDT, 
        loaiNguoiDung);
        console.log(user);
    
        nguoiDungService.capNhatNguoiDung(id, user)
            .then(function(result){
                alert("Update Success")
                getListUser();
            })
            .catch(function(err){
                console.log(err);
            })
}
function getEle(id){
    return document.getElementById(id);
}