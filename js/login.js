
$(function () {
  //表单校验的功能
  var $form = $("form");
  $form.bootstrapValidator({
    //配置校验时的图标
    feedbackIcons: {
      //校验成功的图标
      valid: 'glyphicon glyphicon-ok',
      invalid:'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },
    // 配置校验字段
    fields: {
      username: {
        validators:{
          notEmpty:{
            message: "用户名不能为空"
          },
          callback:{
            message: "用户名不存在"
          }
        }
      },
      password:{
        validators: {
          notEmpty: {
            message: "密码不能为空"
          },
          stringLength: {
            min: 6,
            max: 12,
            message: "密码的长度是6-12位"
          },
          callback: {
            message: "密码错误"
          }
        }
      }
    }
  });
  // 给表单写一个注册成功的事件
  $form.on('success.form.bv',function (event) {
    event.preventDefault();
    // console.log("adg");
    $.ajax({
      type: "post",
      url: "/employee/employeeLogin",
      data: $form.serialize(),
      success: function (data) {
        console.log(data);
        if(data.success){
          location.href = "index.html";
        }
        if(data.error===1000){
          $form.data("bootstrapValidator").updateStatus("username","INVALID","callback");
          // $form.data("bootstrapValidator").updateStatus("username", "INVALID", "callback");
        }
        if(data.error===1001){
          $form.data("bootstrapValidator").updateStatus("password","INVALID","callback");
        }
      }
    })
  });

  $("[type=reset]").on("click",function () {
    // console.log($form.data("bootstrapValidator"));
    $form.data("bootstrapValidator").resetForm();//将表单的值改为默认值

  });
});























