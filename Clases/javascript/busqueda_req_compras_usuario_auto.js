var no_cotizacion;
var usuario_req = "";
var folio_req = "" ;


$(function() {
	$("#usuario").hide();
	$('.delOrd').click(function(e) {e.preventDefault();eliminar($(this),0);});
	//$('.editCot').click(function(e) {e.preventDefault();editar($(this),0);});
	$('.cancelOrd').click(function(e) {e.preventDefault();cancelar($(this),0);});
	//$('#add_usuario').click(function(e) {e.preventDefault();registrar($(this));});
	$( '#dialog' ).dialog({
      autoOpen: false,
      show: {
        effect: "blind",
        duration: 1000
      },
      hide: {
        effect: "explode",
        duration: 1000
      },
		width: 400,
		height: 300,
		overlay: {
                    opacity: 0.5,
                    background: "white"
					
      }
	  
	  
	}).width(400).height(400).css("background", "#ffffff");
	
	$( "#dialog-status" ).dialog({
      autoOpen: false,
      height: 400,
      width: 500,
      modal: true,
      buttons: {
        "Aceptar": 
					function() 
					{
						
						update_status(2);
						$( this ).dialog( "close" ); 
						
					}
		,
        "Cancelar": function() {
					  	$( this ).dialog( "close" );
					}
      },
      close: function() {
        			Pagina(1);
      }
    });

    $( "#dialog_instrucciones44" ).dialog({
      autoOpen: false,
      height: 600,
      width: 600,
      modal: true,
      buttons: {
        "Aceptar": 
          function() 
          {
          	$( this ).dialog( "close" );
            
            
            
          }
    ,
        "Cancelar": function() {
            $( this ).dialog( "close" );
          }
      
          
      },
      close: function() {
                $( this ).dialog( "close" );
      }
    });

    $("#datepicker").datepicker();
    	$( "#dialog-status-compras" ).dialog({
      autoOpen: false,
      height: 400,
      width: 500,
      modal: true,
      buttons: {
        "Aceptar": 
					function() 
					{
						
						update_status_compras(-1);
						
					}
		,
        "Cancelar": function() {
					  	$( this ).dialog( "close" );
					}
      },
      close: function() {
        			Pagina(1);
      }
    });
});
function objetoAjax(){
 if (window.XMLHttpRequest)
	  {
		// code for IE7+, Firefox, Chrome, Opera, Safari
	  	xmlhttp=new XMLHttpRequest();
	  }
	else
	  {
		// code for IE6, IE5
	  	xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
	  }
  return xmlhttp;
}

function Pagina(nropagina){
 	ajax=objetoAjax();
 	var bus=document.getElementById("search").value;
	var filter=document.getElementById("filter").value;   
	document.getElementById("sentencias").innerHTML="cargando...";  
	ajax.onreadystatechange=function()
	  {
		  if (ajax.readyState==4 && ajax.status==200)
			{
				
				document.getElementById("sentencias").innerHTML=ajax.responseText;
			}
	  }
	ajax.open("POST","../Clases/Ajax/busqueda_req_compra_usuario_auto.php",true);
	ajax.setRequestHeader("Content-type","application/x-www-form-urlencoded");
	ajax.send("search="+bus+"&pag="+nropagina+"&filtro="+filter);
}
 




function detalle_proveedor(id)
{
	ajax=objetoAjax();
	ajax.onreadystatechange=function()
	  {
		  if (ajax.readyState==4 && ajax.status==200)
			{
				document.getElementById("dialog").innerHTML=ajax.responseText;
				$("#dialog").dialog("open");
			}
	  }
	ajax.open("POST","../Clases/Ajax/detalleproveedor.php",true);
	ajax.setRequestHeader("Content-type","application/x-www-form-urlencoded");
	ajax.send("search="+id);
}



function detalle_usuario(id)
{
	ajax=objetoAjax();
	ajax.onreadystatechange=function()
	  {
		  if (ajax.readyState==4 && ajax.status==200)
			{
				document.getElementById("dialog").innerHTML=ajax.responseText;
				$("#dialog").dialog("open");
			}
	  }
	ajax.open("POST","../Clases/Ajax/detalleusuario.php",true);
	ajax.setRequestHeader("Content-type","application/x-www-form-urlencoded");
	ajax.send("search="+id);
}

function detalle_orden(id)
{
	$("#dialog").attr("title", "Detalle de Cotizacion")
	ajax=objetoAjax();
	ajax.onreadystatechange=function()
	  {
		  if (ajax.readyState==4 && ajax.status==200)
			{
				document.getElementById("dialog").innerHTML=ajax.responseText;
				$("#dialog").dialog("open");
			}
	  }
	ajax.open("POST","../Clases/Ajax/detalleorden.php",true);
	ajax.setRequestHeader("Content-type","application/x-www-form-urlencoded");
	ajax.send("search="+id);
}


function cancelar(form, ind){
		
 if(ind==0){ 
			var $this = form;
			var idedit=($this.attr('idedit'));
		   }else
		   { 
			 
			 var idedit=""+form;  
			}
			no_cotizacion=idedit;
			update_status(3);
			
}

function eliminar(form, ind){
		
 if(ind==0){ 
			var $this = form;
			var idedit=($this.attr('idedit'));
		   }else
		   { 
			 
			 var idedit=""+form;  
			 
			}
            var horizontalPadding = 15;
            var verticalPadding = 15;
            $('<iframe id="sitedel" src="../Clases/Ajax/orden_eliminar.php?id='+idedit+'" />').dialog({
                open: function(event, ui){ 
        $(this).parents(".ui-dialog:first").find(".ui-widget-header")
            .removeClass("ui-widget-header").addClass("ui-widget-header-custom");
    },
				beforeClose:function(e, m) {
                    Pagina(1);
				},
				title: 'Eliminar Orden',
                autoOpen: true,
                width: 350,
                height: 150,
                modal: true,
                resizable: false,
                autoResize: true,
                overlay: {
                    opacity: 0.5,
					
                    background: "white",
					
                }
				
            }).width(350).height(350).css("background", "#ffffff");
}

function editar(form, ind){	
 		if(ind==0)
		{ 
			var $this = form;
			var idedit=($this.attr('idedit'));
		   }else
		   { 
			 
			 var idedit=""+form;  
		   }
            $('<iframe id="siteedit" src="orden_edicion.php?id='+idedit+'" />').dialog({
                open: function(event, ui){ 
        $(this).parents(".ui-dialog:first").find(".ui-widget-header")
            .removeClass("ui-widget-header").addClass("ui-widget-header-custom");
    },
				beforeClose:function(e, m) {
                    Pagina(1);
				},
				title: 'Editar Orden',
                autoOpen: true,
                width: 500,
                height: 500,
                modal: true,
                resizable: false,
                autoResize: true,
                overlay: {
                    opacity: 0.5,
					
                    background: "white",
					
                }
				
            }).width(500).height(500).css("background", "#ffffff");
}

function cambiar_status(edo){	
		no_orden=edo.id;
  usuario_req = edo.usuario_req;
  folio_req = edo.folio_req;
		$("#dialog-status").dialog( "open" );
}

function update_status(estado)
{
	console.log("no_orden:"+no_orden);
	observaciones="";
	
	var arr={
		accion: "Update_status_Req",
		orden: no_orden, 
		status: $( "#select-status" ).val(),  
		obs: $( "#observaciones" ).val(),
		usuario: $("#usuario").val(),
  usuario_req: usuario_req,
  folio_req: folio_req
	};
 console.log("EL USUARIO REQ: "+usuario_req);
 console.log("EL FOLIO REQ: "+folio_req);
	hilo=$.post(
				 '../Clases/Ajax/add_reqcompra.php',
				 JSON.stringify(arr),
				 function(msg) {
					var message=$.trim(msg);
					//if(message=="Error")
					console.log("det_ord antes:"+message);
					//det_cot=message;
				}
			);
			hilo.done(	
			function(){
					alert("Se ha modificado el estado de la Requisición de compra");
					$( "#dialog_instrucciones44" ).dialog("open");
					//$("#dialog-status").dialog("close");
					//si se hizo un aumento o descuento actualizar el monto total aumentado
			}
		);
}

function cambiar_status_compras(edo){	
		no_orden=edo.id;
		$("#dialog-status-compras").dialog( "open" );
}

function update_status_compras(estado)
{3
	console.log("no_orden:"+no_orden);
	observaciones="";
	if(estado!=3)
	{
		estado= $( "#select-status-compras" ).val();
		observaciones= $( "#observaciones" ).val();
	}
	var arr={
		orden: no_orden, 
		status: estado,  
		obs: observaciones,
		fecha_entrega: $("#datepicker").val()
	};

	console.log("EL ESTATUS:");
	hilo=$.post(
				 '../Clases/Ajax/update_orden_status.php',
				 JSON.stringify(arr),
				 function(msg) {
					var message=$.trim(msg);
					//if(message=="Error")
					console.log("det_ord antes:"+message);
					//det_cot=message;
				}
			);
			hilo.done(	
			function(){
					alert("Se ha modificado el estado de la orden de compra");
					$( "#dialog_instrucciones44" ).dialog("open");
					
					//$("#dialog-status").dialog("close");
					//si se hizo un aumento o descuento actualizar el monto total aumentado
			}
		);
}
