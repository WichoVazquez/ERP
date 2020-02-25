<?// Inicia Página
require_once("index_header.php");
	$user=sesiones_start();
	librerias();
	scripts_head("../Clases/javascript/busqueda_prospecto.js");
	encabezado();
?>

			<h2>Ventas - Prospectos</h2>
<p></p>


 <div id="sentencias" class="content">
 <?
 	require("../Clases/Conexion/conexion_prueba_local.php");
	require("../Clases/Objetos/prospecto.php");
	$link=conect();
	$prospecto=new Prospecto();
	$prospecto->conexion($link);
	$RegistrosAMostrar=20;//esto deberia ser dinamico, tiempo??
	$RegistrosAEmpezar=0;
	$PagAct=1;
	$array=$prospecto->busqueda_parametros("", $RegistrosAEmpezar, $RegistrosAMostrar);
    ;
	if($array!=null)
	{	
		 //echo "".count($array);
		 echo "
		 <label>Fecha de Prospección: <br />
		  <br />
		  <input type='checkbox' name='prospeccion' id='prospeccion' />
		  Carta de Presentación
		  </label>

		
		    <label>
		    <input type='checkbox' name='prospeccion2' id='prospeccion2' /> 
		    Material Multimedia
		</label>

		
		
		    <label>
		    <input type='checkbox' name='prospeccion3' id='prospeccion3' /> 
		    Visita a Cliente
		</label>
		
	
		    <label>
		    <input type='checkbox' name='prospeccion4' id='prospeccion4' /> 
		    Cotización</label>
		
		 
		    <label>
		    <input type='submit' name='button' id='button' value='Editar Cotización' />
		    </label>
		 
		  
		


				<table class='myTable'>
					
						<th></th>
						<th></th>
						<th>Clave</th>
						<th>Razón Social</th>
						<th>RFC</th>
						<th>Domiclio</th>
						<th>Seguimiento</th>
					";
		for($renglones=0; $renglones<count($array);$renglones++)
		{
				echo "<tr>";
							echo "<td><a  class='editCli' href='#' idedit='".$array[$renglones][0]."' style='text-decoration:underline;'><img src=\"../imagenes/b_edit.png\"  title=\"Editar Cliente\"/></a></td>";
							echo"<td><a class='delCli' href='#' idedit='".$array[$renglones][0]."' onClick=\'window.parent.refDialog.dialog('close');\' style='text-decoration:underline;'><img src=\"../imagenes/b_drop.png\" title=\"Eliminar Cliente\"/></a></td>";
							echo "<td>".$array[$renglones][0]."</td>";
							echo "<td>".$array[$renglones][1]."</td>";
							echo "<td>".$array[$renglones][2]."</td>";
							
							echo "<td><a href=\"javascript:detalle_domicilio(".$array[$renglones][3].")\">Ver</a></td>";
							echo "<td><a href=\"javascript:detalle_domicilio(".$array[$renglones][3].")\">Ver</a></td>";
							
						echo "</tr>";
			 
		}
						echo "</table>";
						$NroRegistros=$prospecto->cuenta_resultado("");
						$PagAnt=$PagAct-1;
						$PagSig=$PagAct+1;
						$PagUlt=$NroRegistros/$RegistrosAMostrar;
						
						//verificamos residuo para ver si llevará decimales
						$Res=$NroRegistros%$RegistrosAMostrar;
						// si hay residuo usamos funcion floor para que me
						// devuelva la parte entera, SIN REDONDEAR, y le sumamos
						// una unidad para obtener la ultima pagina
						if($Res>0) $PagUlt=floor($PagUlt)+1;
						
						//desplazamiento
						if($PagAct>1) echo "<a onclick=\"Pagina('$PagAnt')\"  style=\"text-decoration:none;
						cursor:pointer;\"><img src='../images/back_button.png'/></a> ";
						 if($PagAct<$PagUlt) echo " <a onclick=\"Pagina('$PagSig')\" style=\"text-decoration:none;cursor:pointer;\"><img src='../images/next_button.png'/></a> ";
						 
						 echo "<strong>Pagina ".$PagAct." de ".$PagUlt."</strong>&nbsp;";
						 echo "<a onclick=\"Pagina('1')\" class=\"link_regreso\" style=\"text-decoration:none;
						 cursor:pointer;\">Primero &nbsp;</a> ";
						 echo "<a onclick=\"Pagina('$PagUlt')\" class=\"link_regreso\" style=\"text-decoration:none;
						 cursor:pointer;\">Ultimo &nbsp;</a>";
	}
	else
	{
		echo "Búsqueda sin Resultados";
	}
	
	
 ?>
</div>


<?
//Inicia Pie de Página
piepagina();
?>

