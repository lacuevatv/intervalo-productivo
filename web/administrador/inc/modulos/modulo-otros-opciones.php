<?php
function getFile ( $optionName ) {
    $connection = connectDB();
    $tabla      = 'options';
    $query      = "SELECT * FROM " .$tabla. " WHERE options_name= '" .$optionName. "'";
    $result     = mysqli_query($connection, $query);

    if ( $result->num_rows == 0 ) {
        
        return null;
    
    } else {
        
        $data = mysqli_fetch_array($result);
        
        return $data;    
    }
    
    closeDataBase($connection);
}